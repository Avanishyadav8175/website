"use client";

// constants
import { initialCartPrice } from "./constants/initialCartPrice";

// utils
import { createContext } from "react";

// hooks
import { useContext, useEffect, useState } from "react";
import { useAppStates } from "../useAppState/useAppState";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type ReactNode } from "react";
import { initialCartCheckout } from "./constants/initialCartCheckout";
import { useCustomerProfile } from "../useCustomerProfile";
import { getInitialCart } from "./utils/getInitialCart";
import { addCart, fetchCart } from "@/request/dynamic/cart";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { isDateExpired } from "@/app/api/frontend/cart/utils/isDateExpired";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";

const SHOW_STATUS_LOGS = true;

type OptimizedCart = {
  isReady: boolean;
  items: CartItemDocument[];
  price: CartPriceDocument;
  savingAmount: number;
  maxPaymentPercentage: number;
  coupon: CouponDocument | undefined;
  onChangeCoupon: (coupon?: CouponDocument) => void;
  onChangePaymentPercentage: (paymentPercentage: number) => void;
};

// context
const OptimizedCart = createContext<OptimizedCart | null>(null);

// provider
export function OptimizedCartProvider({ children }: { children: ReactNode }) {
  // hooks
  const {
    isReady: isLocalReady,
    location: {
      data: { selectedCity }
    },
    auth: {
      data: { isAuthenticated, customerId }
    },
    profile: {
      data: { detail, addresses, cartId: profileCartId },
      methods: { onChangeCustomer }
    },
    cart: {
      data: { cart: cartLocal },
      method: { onChangeCart: setCartLocal }
    }
  } = useAppStates();
  const {
    cart: { onAdd: onChangeCustomerCartId }
  } = useCustomerProfile();

  // states
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // status states
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // data states
  const [cart, setCart] = useState<CartDocument | null>(null);
  const [cartCloud, setCartCloud] = useState<CartDocument | null>(null);
  const [cartJSON, setCartJSON] = useState<string>("");
  const [cartLocalJSON, setCartLocalJSON] = useState<string>("");
  const [cartCloudJSON, setCartCloudJSON] = useState<string>("");

  // variables
  const items = cart?.items || [];
  const price = cart?.price || initialCartPrice;
  const savingAmount =
    (cart?.items?.reduce((total, { content, quantity }) => {
      const { mrp, price } =
        (content as ContentDocument)?.price?.cities?.find(
          ({ city }) => city === selectedCity?._id
        ) || (content as ContentDocument).price!.base;

      return total + (mrp - price) * quantity;
    }, 0) || 0) + (price?.couponDiscount || 0);
  const maxPaymentPercentage =
    cart?.items?.reduce((max, { content }) => {
      const contentDoc = content as ContentDocument;

      return Math.max(
        (
          (contentDoc?.category?.primary as ContentCategoryDocument)?.charges
            ?.advancePayment as AdvancePaymentDocument
        )?.value || 100,
        max
      );
    }, 0) || 100;
  const coupon = cart?.coupon ? (cart?.coupon as CouponDocument) : undefined;

  // event handlers
  const handleInitializeCart = async () => {
    console.log("handleInitializeCart");

    const newCart = getInitialCart(customerId || "");

    setCart(newCart);
    setCartLocal(newCart);

    // if (isAuthenticated) {
    //   await addCart(newCart)
    //     .then((response) => {
    //       if (response?.data) {
    //         setCartCloud(newCart);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log({ error });
    //     });
    // }
  };

  const handleInitialLoad = async () => {
    console.log("handleInitialLoad");

    if (isLocalReady) {
      if (cartLocal) {
        const validCart = { ...cartLocal } as CartDocument;

        const validCartItems = handleValidateCartItems(validCart.items || []);

        if (
          JSON.stringify(validCart.items) !== JSON.stringify(validCartItems)
        ) {
          validCart.items = validCartItems;
        }

        const recalculatedValidCart = handleUpdatePrice(validCart);

        setCart(recalculatedValidCart);
        setCartLocal(recalculatedValidCart);

        setIsReady(true);
      } else {
        await handleInitializeCart();
      }
    }

    if (isAuthenticated) {
      //   // if (!cartLocal) {
      //   //   if (profileCartId) {
      //   //   } else {
      //   //   }
      //   // }
    }

    setIsReady(true);
  };

  const handleValidateCartItems = (
    cartItems: CartItemDocument[]
  ): CartItemDocument[] => {
    const validDateCartItems = cartItems.filter(
      ({ delivery }) => !isDateExpired(delivery?.date || "")
    );

    const validUniqueCartItems = cartItems.filter(
      ({ content }, index) =>
        validDateCartItems.indexOf(
          validDateCartItems.find(
            ({ content: content2 }) =>
              (content as ContentDocument)._id ===
              (content2 as ContentDocument)._id
          ) as CartItemDocument
        ) === index
    );

    return validUniqueCartItems;
  };

  const handleUpdatePrice = (cart: CartDocument): CartDocument => {
    const updatedCartItems = [...cart.items].map((item) => {
      const updatedItem = { ...item };
      const content = item.content as ContentDocument;
      const cityPrice = content.price?.cities?.find(
        ({ city }) => city === selectedCity?._id
      );

      updatedItem.pricePerUnit = cityPrice?.price || content.price!.base.price;

      return updatedItem as CartItemDocument;
    });

    const newMaxPaymentPercentage =
      updatedCartItems.reduce((max, { content }) => {
        const contentDoc = content as ContentDocument;

        return Math.max(
          (
            (contentDoc?.category?.primary as ContentCategoryDocument)?.charges
              ?.advancePayment as AdvancePaymentDocument
          )?.value || 100,
          max
        );
      }, 0) || 100;

    const content =
      updatedCartItems.reduce(
        (total, { pricePerUnit, quantity }) => total + pricePerUnit * quantity,
        0
      ) || 0;
    const addon =
      updatedCartItems.reduce(
        (total, { addons }) =>
          total +
          addons!.reduce(
            (itemAddonTotal, { pricePerUnit, quantity }) =>
              itemAddonTotal + pricePerUnit * quantity,
            0
          ),
        0
      ) || 0;
    const customization = updatedCartItems.reduce(
      (total, { customization }) =>
        total +
        (customization?.enhancement?.items?.reduce(
          (enhancementTotal, { price }) => enhancementTotal + price,
          0
        ) || 0) +
        (customization?.upgrade?.price || 0) +
        (customization?.flavour?.price || 0),
      0
    );
    const deliveryCharge = updatedCartItems.reduce(
      (max, { content, delivery: { type } }) => {
        const contentDoc = content as ContentDocument;
        const { price } = type as DeliveryTypeDocument;

        return Math.max(
          contentDoc.availability?.availableAt === "all-india"
            ? (contentDoc.delivery!.charge as number)
            : price,
          max
        );
      },
      0
    );

    const total =
      content +
      addon +
      customization +
      deliveryCharge -
      cart.price.couponDiscount;

    const payable =
      cart.price.paymentPercentage !== newMaxPaymentPercentage ||
      cart.price.paymentPercentage === 100
        ? total
        : Math.ceil(
            (content + customization) * (cart.price.paymentPercentage / 100)
          ) +
          addon +
          deliveryCharge;
    const due = total - payable;

    return {
      ...cart,
      items: updatedCartItems,
      price: {
        ...cart.price,
        content,
        addon,
        customization,
        deliveryCharge,
        total,
        paymentPercentage:
          cart.price.paymentPercentage === newMaxPaymentPercentage
            ? newMaxPaymentPercentage
            : 100,
        payable,
        due
      } as CartPriceDocument
    } as CartDocument;
  };

  // modifiers
  const handleChangeCoupon = (coupon?: CouponDocument) => {
    const { content, addon, customization, deliveryCharge } = cart!.price;

    const newCouponDiscount = coupon
      ? (() => {
          if (coupon.type === "free-delivery") {
            return deliveryCharge;
          } else {
            if (coupon.discount!.type === "fixed") {
              return coupon.discount!.limit;
            } else {
              return Math.min(
                Math.ceil(
                  (content + customization) *
                    (coupon.discount!.percentage! / 100)
                ),
                coupon.discount!.limit
              );
            }
          }
        })()
      : 0;

    setCart({
      ...cart,
      price: {
        ...cart!.price,
        ...(coupon
          ? {
              paymentPercentage: 100,
              couponDiscount: newCouponDiscount,
              total:
                content +
                addon +
                customization +
                deliveryCharge -
                newCouponDiscount,
              payable:
                content +
                addon +
                customization +
                deliveryCharge -
                newCouponDiscount,
              due: 0
            }
          : {
              couponDiscount: 0,
              total: content + addon + customization + deliveryCharge,
              payable: content + addon + customization + deliveryCharge
            })
      },
      coupon
    } as CartDocument);
  };

  const handleChangePaymentPercentage = (paymentPercentage: number) => {
    setCart({
      ...cart,
      price: {
        ...price,
        paymentPercentage,
        ...(paymentPercentage === 100 ? {} : { couponDiscount: 0 })
      } as CartPriceDocument,
      ...(paymentPercentage === 100 ? {} : { coupon: undefined })
    } as CartDocument);
  };

  const getDBCart = (cart: CartDocument): CartDocument =>
    ({
      _id: cart._id,
      isOrdered: cart.isOrdered,
      customer: cart.customer || customerId || "",
      items: [...cart.items].map((item) => {
        const dbItem = { ...item } as CartItemDocument;

        dbItem.content = (dbItem.content as ContentDocument)._id as string;
        dbItem.delivery = {
          ...dbItem.delivery,
          ...(dbItem.delivery?.type
            ? {
                type: (dbItem.delivery.type as DeliveryTypeDocument)
                  ._id as string
              }
            : {}),
          ...(dbItem.delivery?.slot
            ? { slot: (dbItem.delivery.slot as TimeSlotDocument)._id as string }
            : {})
        } as CartItemDeliveryDocument;
        if (dbItem?.addons?.length) {
          dbItem.addons = [...dbItem.addons].map((itemAddon) => {
            const dbItemAddon = { ...itemAddon } as CartItemAddonDocument;

            dbItemAddon.addon = (dbItemAddon.addon as AddonDocument)
              ._id as string;

            return dbItemAddon;
          });
        }

        if (
          dbItem?.customization?.enhancement?.items?.length ||
          dbItem?.customization?.upgrade ||
          dbItem?.customization?.flavour ||
          dbItem?.customization?.balloonColor ||
          dbItem?.customization?.uploadedText ||
          dbItem?.customization?.uploadedImage
        ) {
          console.log("how");
          dbItem.customization = {
            ...(dbItem?.customization?.enhancement?.items?.length
              ? {
                  enhancement: {
                    ...dbItem.customization.enhancement,
                    items: [...dbItem.customization.enhancement.items].map(
                      (enhancement) => {
                        const dbEnhancement = {
                          ...enhancement
                        } as CartItemEnhancementItemDocument;

                        dbEnhancement.enhancement = (
                          dbEnhancement.enhancement as EnhancementDocument
                        )._id as string;

                        return dbEnhancement;
                      }
                    )
                  } as CartItemEnhancementDocument
                }
              : {}),
            ...(dbItem?.customization?.upgrade
              ? {
                  upgrade: {
                    ...dbItem.customization.upgrade,
                    upgrade: (
                      dbItem.customization.upgrade.upgrade as UpgradeDocument
                    )._id as string
                  } as CartItemUpgradeDocument
                }
              : {}),
            ...(dbItem?.customization?.flavour
              ? {
                  flavour: {
                    ...dbItem.customization.flavour,
                    flavour: (
                      dbItem.customization.flavour.flavour as FlavourDocument
                    )._id as string
                  } as CartItemFlavourDocument
                }
              : {}),
            ...(dbItem?.customization?.balloonColor
              ? {
                  balloonColor: dbItem.customization.balloonColor
                }
              : {}),
            ...(dbItem?.customization?.uploadedText
              ? {
                  uploadedText: dbItem.customization.uploadedText
                }
              : {}),
            ...(dbItem?.customization?.uploadedImage
              ? {
                  uploadedImage: dbItem.customization.uploadedImage
                }
              : {})
          } as CartItemCustomizationDocument;
        } else {
          delete dbItem.customization;
        }

        return dbItem;
      }),
      price: cart.price,
      ...(cart.checkout?.name &&
      cart.checkout?.contact?.mobileNumber &&
      cart.checkout?.contact?.mail &&
      cart.checkout?.location?.address &&
      cart.checkout?.location?.city &&
      cart.checkout?.location?.pincode
        ? { checkout: cart.checkout }
        : {}),
      ...(cart.coupon
        ? { coupon: (cart.coupon as CouponDocument)._id as string }
        : {})
    }) as CartDocument;

  // side effects
  // onMount
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // status states
  useEffect(() => {
    if (isMounted) {
      if (SHOW_STATUS_LOGS) {
        console.log({ isMounted });
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (SHOW_STATUS_LOGS) {
        console.log({ isReady });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (isMounted) {
      if (SHOW_STATUS_LOGS) {
        console.log({ isLoading });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // initialize
  useEffect(() => {
    if (isMounted) {
      (async () => {
        if (SHOW_STATUS_LOGS) {
          console.log({ isLocalReady });
        }

        if (isLocalReady) {
          await handleInitialLoad();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, isLocalReady]);

  // domino
  useEffect(() => {
    if (isReady) {
      if (SHOW_STATUS_LOGS) {
        console.log({ cart });
      }

      if (cart) {
        setCartJSON(JSON.stringify(cart));
      } else if (cartJSON) {
        setCartJSON("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, cart]);

  useEffect(() => {
    if (isReady) {
      if (cartLocal) {
        if (SHOW_STATUS_LOGS) {
          console.log({ cartLocal });
        }

        const validCartItems = handleValidateCartItems(cartLocal.items || []);

        if (
          JSON.stringify(cartLocal.items) !== JSON.stringify(validCartItems)
        ) {
          setCartLocal({ ...cartLocal, items: validCartItems } as CartDocument);
          return;
        }

        const recalculatedCart = handleUpdatePrice(cartLocal);

        const price = cartLocal.price;
        const recalculatedPrice = recalculatedCart.price;

        if (JSON.stringify(price) !== JSON.stringify(recalculatedPrice)) {
          setCartLocal(recalculatedCart);
        } else {
          setCartLocalJSON(JSON.stringify(cartLocal));
        }
      } else if (cartLocalJSON) {
        setCartLocalJSON("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, cartLocal]);

  useEffect(() => {
    if (isReady) {
      if (SHOW_STATUS_LOGS) {
        console.log({ cartCloud });
      }

      setCartCloudJSON(cartCloud ? JSON.stringify(cartCloud) : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, cartCloud]);

  useEffect(() => {
    if (isReady) {
      if (SHOW_STATUS_LOGS) {
        console.log({ cartJSON });
      }

      if (cartJSON !== cartLocalJSON) {
        setCartLocal(cart);
      }

      if (isAuthenticated && !profileCartId && cartJSON !== cartCloudJSON) {
        setCartCloud(cart);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, cartJSON]);

  useEffect(() => {
    if (isReady) {
      if (cartLocalJSON !== cartJSON) {
        if (SHOW_STATUS_LOGS) {
          console.log({ cartLocalJSON });
        }

        setCart(cartLocal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, cartLocalJSON]);

  useEffect(() => {
    if (isReady) {
      if (cartCloudJSON !== cartJSON) {
        if (SHOW_STATUS_LOGS) {
          console.log({ cartCloudJSON });
        }

        if (cartCloud?.isOrdered) {
          onChangeCustomerCartId("");
        } else {
          setCartLocal(cartCloud);
        }
        // ? have to validate & merge items and update price
        setCart(cartLocal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, cartCloudJSON]);

  useEffect(() => {
    if (isReady) {
      if (price.paymentPercentage !== maxPaymentPercentage) {
        if (SHOW_STATUS_LOGS) {
          console.log({ maxPaymentPercentage });
        }

        handleChangePaymentPercentage(100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPaymentPercentage]);

  useEffect(() => {
    if (isReady) {
      if (cart) {
        if (SHOW_STATUS_LOGS) {
          console.log({ selectedCity });
        }

        setCart(handleUpdatePrice(cart));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, selectedCity]);

  // cloud
  useEffect(() => {
    if (isReady) {
      (async () => {
        if (isAuthenticated) {
          if (SHOW_STATUS_LOGS) {
            console.log({ isAuthenticated });
          }

          if (profileCartId) {
            fetchCart(profileCartId)
              .then(({ data: cartCloud }) => {
                if (cartCloud) {
                  setCartCloud(cartCloud as CartDocument);
                }
              })
              .catch((error) => {
                console.log({ error });
              });
          } else {
            if (!isLoading) {
              if (cart) {
                setIsLoading(true);

                console.log({ cartDB: getDBCart(cart) });

                addCart(getDBCart(cart))
                  .then(() => {
                    onChangeCustomerCartId(cart._id as string);
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
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isAuthenticated]);

  return (
    <OptimizedCart.Provider
      value={{
        isReady,
        items,
        price,
        savingAmount,
        maxPaymentPercentage,
        coupon,
        onChangeCoupon: handleChangeCoupon,
        onChangePaymentPercentage: handleChangePaymentPercentage
      }}
    >
      {children}
    </OptimizedCart.Provider>
  );
}

export const useOptimizedCart = (): OptimizedCart => {
  const optimizedCart = useContext(OptimizedCart);

  if (!optimizedCart) {
    throw new Error(
      "useOptimizedCart must be used within a OptimizedCartProvider"
    );
  }

  return optimizedCart;
};
