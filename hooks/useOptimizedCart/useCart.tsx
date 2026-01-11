"use client";

// constants
import { initialCartPrice } from "./constants/initialCartPrice";

// requests
import { addCart, fetchCart, updateCart } from "@/request/dynamic/cart";

// utils
import { createContext, useContext } from "react";
import { calculateCartPrice } from "./utils/calculateCartPrice";
import { validateCartItems } from "./utils/validateCartItems";

// hooks
import { useEffect, useState } from "react";
import { useAppStates } from "../useAppState/useAppState";
import { useCustomerProfile } from "../useCustomerProfile";

// types
import { type AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { type CartCheckoutContactDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutContact";
import { type CartCheckoutLocationDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutLocation";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";
import { type CustomerDetail } from "../useAppState/types/profile";
import { type ReactNode } from "react";

// declarations
// constants
const SHOW_LOGS = false;

// types
type Cart = {
  isReady: boolean;
  items: CartItemDocument[];
  price: CartPriceDocument;
  savingAmount: number;
  maxPaymentPercentage: number;
  checkout: CartCheckoutDocument | null;
  coupon: CouponDocument | null;
  onCreateCart: () => void;
  onChangeItems: (items: CartItemDocument[]) => void;
  onChangePaymentPercentage: (paymentPercentage: number) => void;
  onChangeCheckout: (checkout: CartCheckoutDocument | null) => void;
  onChangeCoupon: (coupon: CouponDocument | null) => void;
};

// context
const Cart = createContext<Cart | null>(null);

// exports
export function CartProvider({ children }: { children: ReactNode }) {
  // hooks
  const {
    isReady: isLocalReady,
    isOrdered,
    location: {
      data: { selectedCity }
    },
    auth: {
      data: { isAuthenticated, customerId }
    },
    profile: {
      data: { detail, addresses, cartId: profileCartId }
    },
    cart: {
      data: { cart },
      method: { onChangeCart: setCart }
    }
  } = useAppStates();
  const {
    isReady: isProfileReady,
    address: { onAdd: onAddAddress },
    detail: { onChange: onChangeCustomerDetail },
    cart: { onAdd: onChangeCustomerCartId }
  } = useCustomerProfile();

  // states
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // status states
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isCloudReady, setIsCloudReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // data states
  // data states: id
  const [id, setId] = useState<string>("");

  // data states: items
  const [items, setItems] = useState<CartItemDocument[]>([]);
  const [itemsLocal, setItemsLocal] = useState<CartItemDocument[]>([]);
  const [itemsCloud, setItemsCloud] = useState<CartItemDocument[]>([]);
  const [itemsLocalJSON, setItemsLocalJSON] = useState<string>("[]");
  const [itemsCloudJSON, setItemsCloudJSON] = useState<string>("[]");

  // data states: price
  const [paymentPercentage, setPaymentPercentage] = useState<number>(100);
  const [price, setPrice] = useState<CartPriceDocument>(initialCartPrice);

  // data states: checkout
  const [checkout, setCheckout] = useState<CartCheckoutDocument | null>(null);
  const [checkoutCloud, setCheckoutCloud] =
    useState<CartCheckoutDocument | null>(null);

  // data states: coupon
  const [coupon, setCoupon] = useState<CouponDocument | null>(null);

  // variables
  const savingAmount =
    (items.reduce((total, { content, quantity }) => {
      const { mrp, price } =
        (content as ContentDocument)?.price?.cities?.find(
          ({ city }) => city === selectedCity?._id
        ) || (content as ContentDocument).price!.base;

      return total + (mrp ? (mrp - price) * quantity : 0);
    }, 0) || 0) + (price?.couponDiscount || 0);
  const maxPaymentPercentage =
    items?.reduce((max, { content }) => {
      const contentDoc = content as ContentDocument;

      return Math.max(
        (
          (contentDoc?.category?.primary as ContentCategoryDocument)?.charges
            ?.advancePayment as AdvancePaymentDocument
        )?.value || 100,
        max
      );
    }, 0) || 100;

  // event handlers
  const handleInitialLoad = async () => {
    if (SHOW_LOGS) {
      console.log("handleInitialLoad");
    }

    if (cart) {
      if (cart.items && cart.items.length) {
        setItemsLocal(validateCartItems({ items: cart.items, selectedCity }));
      }

      if (
        cart?.price?.paymentPercentage &&
        cart.price.paymentPercentage !== 100
      ) {
        setPaymentPercentage(cart.price.paymentPercentage);
      }

      if (
        cart.checkout &&
        cart.checkout?.name &&
        cart.checkout?.contact?.mobileNumber &&
        cart.checkout?.contact?.mail &&
        cart.checkout?.location?.address &&
        cart.checkout?.location?.city &&
        cart.checkout?.location?.pincode
      ) {
        setCheckout(cart.checkout);
      }

      if (cart.coupon) {
        setCoupon(cart.coupon as CouponDocument);
      }
    }

    setIsReady(true);
  };

  const handleChangePaymentPercentage = (paymentPercentage: number) => {
    setPaymentPercentage(paymentPercentage);

    if (paymentPercentage !== 100) {
      setCoupon(null);
    }
  };

  const handleCreateCart = () => {
    setIsLoading(true);

    addCart({
      customer: customerId,
      items,
      price,
      ...(checkout ? { checkout } : {})
    } as CartDocument)
      .then(({ data: newCart }) => {
        if (newCart) {
          setId(newCart._id as string);
          onChangeCustomerCartId(newCart._id as string);

          if (checkout) {
            setCheckoutCloud(checkout);
          }

          if (!isCloudReady) {
            setIsCloudReady(true);
          }

          setIsLoading(false);

          if (SHOW_LOGS) {
            console.log("Created Cart");
          }
        }
      })
      .catch((error) => {});
  };

  // side effects
  // side effects: onMount
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // status states
  useEffect(() => {
    if (isMounted) {
      if (SHOW_LOGS) {
        console.log({ isMounted });
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (SHOW_LOGS) {
        console.log({ isReady });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (isMounted) {
      if (SHOW_LOGS) {
        console.log({ isLoading });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // JSON
  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ itemsLocal });
      }

      setItemsLocalJSON(JSON.stringify(itemsLocal));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsLocal]);

  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ itemsCloud });
      }

      setItemsCloudJSON(JSON.stringify(itemsCloud));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsCloud]);

  // initialize
  useEffect(() => {
    if (isMounted) {
      (async () => {
        if (SHOW_LOGS) {
          console.log({ isLocalReady });
        }

        if (isLocalReady) {
          await handleInitialLoad();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, isLocalReady]);

  // id
  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ id });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // items
  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ items });
      }

      if (JSON.stringify(items) !== itemsLocalJSON) {
        setItemsLocal(items);
      }

      if (JSON.stringify(items) !== itemsCloudJSON) {
        setItemsCloud(items);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ itemsLocalJSON });
      }

      if (itemsLocalJSON !== JSON.stringify(items)) {
        setItems(validateCartItems({ selectedCity, items: itemsLocal }));
      }

      if (itemsLocalJSON !== JSON.stringify(cart?.items)) {
        setCart({
          ...cart,
          items: itemsLocal
        } as CartDocument);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsLocalJSON]);

  // price
  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ items, paymentPercentage, coupon });
      }

      const newPrice = calculateCartPrice({ items, paymentPercentage, coupon });

      setPrice(newPrice);

      if (coupon && !newPrice.couponDiscount) {
        setCoupon(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, paymentPercentage, coupon]);

  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ price });
      }

      setCart({
        ...cart,
        price
      } as CartDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  // checkout
  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ checkout });
      }

      if (
        checkout &&
        (!detail?.name ||
          detail.name === "User" ||
          !detail.mobileNumber ||
          !detail.mail)
      ) {
        onChangeCustomerDetail({
          ...detail,
          ...((!detail?.name || detail.name === "User") && checkout.name
            ? { name: checkout.name }
            : {}),
          ...(!detail?.mobileNumber
            ? {
                mobileNumber: checkout.contact.mobileNumber.slice(10)
              }
            : {}),
          ...(!detail?.mail
            ? {
                mail: checkout.contact.mail
              }
            : {})
        } as CustomerDetail);
      }

      if (checkout && !addresses.length) {
        onAddAddress({
          address: checkout.location.address,
          city: checkout.location.city,
          pincode: checkout.location.pincode,
          type: "Default",
          isDefault: true
        } as CustomerAddressDocument);
      }

      setCart({
        ...cart,
        checkout
      } as CartDocument);

      if (
        isCloudReady &&
        JSON.stringify(checkout) !== JSON.stringify(checkoutCloud)
      ) {
        if (!isLoading) {
          setIsLoading(true);

          updateCart(id, { checkout } as CartDocument)
            .then(() => {
              console.log("Updated Checkout");
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });

          setCheckoutCloud(checkout);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout]);

  // coupon
  useEffect(() => {
    if (isReady) {
      if (SHOW_LOGS) {
        console.log({ itemsLocalJSON });
      }

      setCart({
        ...cart,
        coupon
      } as CartDocument);

      if (isCloudReady) {
        if (!isLoading) {
          setIsLoading(true);

          updateCart(id, {
            items,
            price: calculateCartPrice({ items, paymentPercentage, coupon }),
            ...(checkout ? { checkout } : { $unset: { checkout: 1 } }),
            ...(coupon ? { coupon } : { $unset: { coupon: 1 } })
          } as CartDocument)
            .then(() => {
              console.log("Updated Coupon");
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });

          setCheckoutCloud(checkout);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon]);

  // cloud
  useEffect(() => {
    if (isReady && !isOrdered && isProfileReady) {
      if (SHOW_LOGS) {
        console.log("cloud init");
      }

      if (isAuthenticated && customerId) {
        if (profileCartId) {
          if (!isLoading) {
            setIsLoading(true);

            fetchCart(profileCartId)
              .then(({ data: cart }) => {
                if (cart) {
                  setId(profileCartId);
                  onChangeCustomerCartId(profileCartId);

                  const newItems = validateCartItems({
                    selectedCity,
                    items: [...(itemsLocal ? itemsLocal : []), ...cart.items!]
                  });

                  if (JSON.stringify(newItems) !== JSON.stringify(items)) {
                    setItems(newItems);
                  }

                  if (cart.checkout) {
                    setCheckoutCloud(cart.checkout);

                    if (
                      JSON.stringify(cart.checkout) !== JSON.stringify(checkout)
                    ) {
                      setCheckout(cart.checkout);
                    }
                  }

                  setIsCloudReady(true);

                  setIsLoading(false);

                  if (SHOW_LOGS) {
                    console.log("Fetched Cart");
                  }
                }
              })
              .catch((error) => {
                // console.log(error);

                addCart({
                  customer: customerId,
                  items,
                  price,
                  ...(checkout ? { checkout } : {})
                } as CartDocument)
                  .then(({ data: newCart }) => {
                    if (newCart) {
                      setId(newCart._id as string);
                      onChangeCustomerCartId(newCart._id as string);

                      if (checkout) {
                        setCheckoutCloud(checkout);
                      }

                      setIsCloudReady(true);

                      setIsLoading(false);

                      if (SHOW_LOGS) {
                        console.log("Created Cart");
                      }
                    }
                  })
                  .catch((error) => {
                    addCart({
                      customer: customerId,
                      items,
                      price,
                      ...(checkout ? { checkout } : {})
                    } as CartDocument)
                      .then(({ data: newCart }) => {
                        if (newCart) {
                          setId(newCart._id as string);
                          onChangeCustomerCartId(newCart._id as string);

                          if (checkout) {
                            setCheckoutCloud(checkout);
                          }

                          setIsCloudReady(true);

                          setIsLoading(false);

                          if (SHOW_LOGS) {
                            console.log("Created Cart");
                          }
                        }
                      })
                      .catch((error) => {
                        // console.log(error);
                      });
                  });
              });
          }
        } else {
          if (!isLoading) {
            setIsLoading(true);

            addCart({
              customer: customerId,
              items,
              price,
              ...(checkout ? { checkout } : {})
            } as CartDocument)
              .then(({ data: newCart }) => {
                if (newCart) {
                  setId(newCart._id as string);
                  onChangeCustomerCartId(newCart._id as string);

                  if (checkout) {
                    setCheckoutCloud(checkout);
                  }

                  setIsCloudReady(true);

                  setIsLoading(false);

                  if (SHOW_LOGS) {
                    console.log("Created Cart");
                  }
                }
              })
              .catch((error) => {
                addCart({
                  customer: customerId,
                  items,
                  price,
                  ...(checkout ? { checkout } : {})
                } as CartDocument)
                  .then(({ data: newCart }) => {
                    if (newCart) {
                      setId(newCart._id as string);
                      onChangeCustomerCartId(newCart._id as string);

                      if (checkout) {
                        setCheckoutCloud(checkout);
                      }

                      setIsCloudReady(true);

                      setIsLoading(false);

                      if (SHOW_LOGS) {
                        console.log("Created Cart");
                      }
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isProfileReady, isAuthenticated]);

  useEffect(() => {
    if (isReady && !isOrdered) {
      if (SHOW_LOGS) {
        console.log({ itemsCloudJSON });
      }

      if (isCloudReady && !isOrdered) {
        if (!isLoading) {
          setIsLoading(true);

          updateCart(id, {
            items,
            price,
            ...(checkout ? { checkout } : { $unset: { checkout: 1 } }),
            ...(coupon ? { coupon } : { $unset: { coupon: 1 } })
          } as CartDocument)
            .then(() => {
              if (SHOW_LOGS) {
                console.log("Updated Items");
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCloudReady, itemsCloudJSON]);

  useEffect(() => {
    if (isReady && !isOrdered) {
      if (SHOW_LOGS) {
        console.log({ itemsCloudJSON });
      }

      if (isCloudReady && !isOrdered) {
        if (!isLoading) {
          setIsLoading(true);

          updateCart(id, {
            items,
            ...(price.paymentPercentage === paymentPercentage
              ? { price }
              : {
                  price: calculateCartPrice({
                    items,
                    paymentPercentage,
                    coupon
                  })
                }),
            ...(checkout ? { checkout } : { $unset: { checkout: 1 } }),
            ...(coupon ? { coupon } : { $unset: { coupon: 1 } })
          } as CartDocument)
            .then(() => {
              if (SHOW_LOGS) {
                console.log("Updated Items");
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentPercentage]);

  useEffect(() => {
    if (isReady && isProfileReady) {
      if (SHOW_LOGS) {
        console.log({ isReady, isProfileReady });
      }

      if (!checkout) {
        if (
          detail?.name &&
          detail?.mobileNumber &&
          detail?.mail &&
          addresses?.length
        ) {
          const defaultAddress = addresses.find(
            ({ isDefault }) => isDefault
          ) as CustomerAddressDocument;

          setCheckout({
            name: detail.name,
            contact: {
              mobileNumber: detail.mobileNumber,
              mail: detail.mail
            } as CartCheckoutContactDocument,
            location: {
              address: defaultAddress.address,
              // city: defaultAddress.city,
              pincode: defaultAddress.pincode
            } as CartCheckoutLocationDocument
          } as CartCheckoutDocument);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isProfileReady]);

  // order
  useEffect(() => {
    if (isReady && isOrdered) {
      if (SHOW_LOGS) {
        console.log({ isOrdered });
      }

      setId("");
      setItems([]);
      setPaymentPercentage(100);
      setCheckout(null);
      setCheckoutCloud(null);
      setCoupon(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrdered]);

  return (
    <Cart.Provider
      value={{
        isReady,
        items,
        price,
        savingAmount,
        maxPaymentPercentage,
        checkout,
        coupon,
        onCreateCart: handleCreateCart,
        onChangeItems: setItems,
        onChangeCoupon: setCoupon,
        onChangePaymentPercentage: handleChangePaymentPercentage,
        onChangeCheckout: setCheckout
      }}
    >
      {children}
    </Cart.Provider>
  );
}

export const useCart = (): Cart => {
  const cart = useContext(Cart);

  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cart;
};
