
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  extractAppliedCoupon,
  extractCartDetails,
  extractCartItems,
  extractDeliveryDetails,
  extractPrice,
  filterRelevantCoupons,
  getPartialPercentage
} from "@/common/helpers/cartMappers/funnelDownToCart";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CartDocument } from "@/common/types/documentation/dynamic/cart";
import { CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { CartItemChoiceType } from "@/components/(frontend)/transaction/cart/static/types";
import {
  CartItemType,
  DeliveryDetailsType,
  TransactionPriceSummaryType
} from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useLocation } from "./useLocation/useLocation";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import {
  getLocalStorageCartCoupon,
  getLocalStorageCartDeliveryDetails,
  getLocalStorageCartPrice,
  getLocalStorageContentDocuments,
  setLocalStorageCartCoupon,
  setLocalStorageCartDeliveryDetails,
  setLocalStorageCartPrice,
  setLocalStorageContentDocuments
} from "@/common/helpers/cartMappers/localStorage";
import {
  handleAddNewItemToCart,
  handleCartItemInteractionUpdates,
  mergeLocalAndAPICartData,
  updateMasterCartPrices
} from "@/common/helpers/cartMappers/manageCartContext";
import { CartCheckoutContactDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutContact";
import { CartCheckoutLocationDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutLocation";
import { fetchAllCoupons } from "@/request/coupon/coupons";
import { useCustomerProfile } from "./useCustomerProfile";
import { useCustomerAuth } from "./auth/useCustomerAuth";
import { addCart, fetchCart, updateCart } from "@/request/dynamic/cart/request";
import { CONTENT_POPULATE } from "@/request/content/contents";
import {
  excludePartialCheckout,
  getDatabaseReadyCartDocument,
  removeLocalIds,
  updateCartPrices
} from "@/common/helpers/cartMappers/getDatabaseFormatwiseData";
import { fetchOccasions } from "@/request/preset/occasion";
import { OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { REGEX_TEST } from "@/common/constants/regex";
import { CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";
import { CityDocument } from "@/common/types/documentation/presets/city";
// import { PincodeDocument } from "@/common/types/documentation/presets/pincode";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { useAppStates } from "./useAppState/useAppState";
import { CustomerDetail } from "./useAppState/types/profile";

const DEFAULT_PRICE_DOCUMENT: CartPriceDocument = {
  content: 0,
  addon: 0,
  customization: 0,
  deliveryCharge: 0,
  paymentPercentage: 100,
  couponDiscount: 0
} as CartPriceDocument;

const DEFAULT_CHECKOUT_DOCUMENT: CartCheckoutDocument = {
  name: "",
  contact: {
    mobileNumber: "",
    mail: ""
  },
  location: {
    address: "",
    city: "",
    pincode: ""
  }
} as CartCheckoutDocument;

const DEFAULT_CART_DOCUMENT: CartDocument = {
  isOrdered: false,
  checkout: DEFAULT_CHECKOUT_DOCUMENT,
  price: DEFAULT_PRICE_DOCUMENT,
  items: [] as CartItemDocument[],
  customer: ""
} as CartDocument;

type LocalStorageCart = {
  items: CartItemType[];
  itemDetails: CartItemChoiceType[];
  appliedCoupon: CouponDocument | null;
  deliveryDetails: DeliveryDetailsType;
  price: TransactionPriceSummaryType;
};

// CONTEXT STARTS HERE ===============================================

// data shown will match the types for /cart page types (CartPage.tsx)
type Cart = {
  data: {
    items: CartItemType[];
    itemDetails: CartItemChoiceType[];
    price: TransactionPriceSummaryType;
    deliveryDetails: DeliveryDetailsType;
    appliedCoupon: CouponDocument | null;
    allCoupons: CouponDocument[];
    partialPercentage: number;
    occasions: OccasionDocument[];
    isCheckoutComplete: { status: boolean; message: string };
  };
  cartFunctions: {
    updateCartContext: {
      updateItems: ({
        items,
        itemDetails
      }: {
        items: CartItemType[];
        itemDetails: CartItemChoiceType[];
      }) => void;
      updatePaymentPercentage: (selectedPercentage: number) => void;
      updateSelectedCoupon: (selectedCoupon: CouponDocument | null) => void;
      updateDeliveryDetails: (updatedDetails: DeliveryDetailsType) => void;
    };
    clearCart: () => void;
  };
  addToCartFunctions: {
    addItem: (details: CartItemDocument) => void;
  };
};

const Cart = createContext<Cart>({
  addToCartFunctions: {
    addItem: () => {}
  },
  data: {
    items: [],
    itemDetails: [],
    price: {
      base: 0,
      addon: 0,
      paymentPercentage: 0,
      coupon: 0,
      platform: 0
    },
    deliveryDetails: {
      address: "",
      city: "",
      email: "",
      mobile: "",
      name: "",
      occasion: "",
      pincode: "",
      type: "default"
    },
    appliedCoupon: null,
    allCoupons: [],
    partialPercentage: 100,
    occasions: [],
    isCheckoutComplete: { message: "", status: false }
  },
  cartFunctions: {
    updateCartContext: {
      updateItems: function ({
        items,
        itemDetails
      }: {
        items: CartItemType[];
        itemDetails: CartItemChoiceType[];
      }): void {},
      updatePaymentPercentage: function (updatedPercentage: number): void {},
      updateSelectedCoupon: function (
        selectedCoupon: CouponDocument | null
      ): void {},
      updateDeliveryDetails: function (
        updatedDetails: DeliveryDetailsType
      ): void {}
    },
    clearCart: () => {}
  }
});

/*
POINTS TO READ FOR THIS CONTEXT: 
- the /cart route doesn't require the entire ContentDocument to work
- in-fact, having to each time find the correct price from PriceDocument is cumbersome
- the state in this context manages the CartDocument as a whole 
- only the necessary data is funnelled down to the /cart page (CartPage.tsx)
- any updates to cart page, is pushed back up to this context which updates the master state which in turns updates the cart page

- funnelling down helper functions:
    - cartItems:        extractCartItems
    - cartDetails:      extractCartDetails
    - cartPrice:        extractPrice
    - deliveryDetails:  extractDeliveryDetails
    - appliedCoupon:    extractAppliedCoupon

- push up helper functions:
    - updateItems:           updateMasterCartItems
    - updatePrice:           updateMasterCartPrice
    - updateSelectedCoupon:  updateMasterCartDeliveryDetails
    - updateDeliveryDetails: updateMasterCartAppliedCoupon
*/

export function CartProvider({ children }: { children: ReactNode }) {
  // master data
  const [theCart, setTheCart] = useState<CartDocument>(DEFAULT_CART_DOCUMENT);
  const [allCoupons, setAllCoupons] = useState<CouponDocument[]>([]);
  const [apiCalled, setApiCalled] = useState<boolean>(false);
  const [saveToLS, setSaveToLS] = useState<boolean>(false);
  const [updatePrice, setUpdatePrice] = useState<boolean>(false);
  const [dontSaveToDB, setDontSaveToDB] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [allOccasions, setALlOccasions] = useState<OccasionDocument[]>([]);
  const [exclusiveInject, setExclusiveInject] = useState<
    "none" | "cart" | "delivery"
  >("none");
  const [saveCartAsNewDocToDB, setSaveCartAsNewDocToDB] = useState<{
    truthy: boolean;
    triggered: boolean;
  }>({ triggered: false, truthy: false });
  const [isCheckoutComplete, setIsCheckoutComplete] = useState<{
    status: boolean;
    message: string;
  }>({ message: "", status: false });

  const {
    isReady,
    location: {
      data: { selectedCity }
    },
    auth: {
      data: { isAuthenticated: isUserLoggedIn, customerId }
    },
    profile: {
      data: { detail: customerDetailsFromContext, addresses, cartId }
    }
  } = useAppStates();
  const {
    cart: { onAdd: addCartId },
    detail: { onChange: updateCustomerDetailsToContext },
    address: { onAdd: addAddressToCustomer }
  } = useCustomerProfile();

  // content page handlers -------------------------------------------------
  const addItemToCart = (newItem: CartItemDocument) => {
    handleAddNewItemToCart({ cart: theCart, newItem, setCart: setTheCart });
    setUpdatePrice((prev) => true);

    // idk why this works only V
    setTimeout(() => setExclusiveInject((prev) => "cart"), 300);
  };

  // push up to context function handlers -------------------------------------------------
  const updateMasterCartItems = ({
    items,
    itemDetails
  }: {
    items: CartItemType[];
    itemDetails: CartItemChoiceType[];
  }) => {
    handleCartItemInteractionUpdates({
      cart: theCart,
      setCart: setTheCart,
      updatedItemChoices: itemDetails,
      updatedItems: items
    });
    setUpdatePrice((prev) => true);

    // idk why this works only V
    setTimeout(() => setExclusiveInject((prev) => "cart"), 300);
  };

  const updateMasterCartPaymentPercentage = (updatedPercentage: number) => {
    setTheCart(
      (prev) =>
        ({
          ...prev,
          price: { ...prev.price, paymentPercentage: updatedPercentage }
        }) as CartDocument
    );
    setUpdatePrice((prev) => true);
    setLocalStorageCartPrice(
      theCart.price.paymentPercentage ? theCart.price.paymentPercentage : 100
    );
  };

  const updateMasterCartDeliveryDetails = (
    updatedDetails: DeliveryDetailsType
  ) => {
    const updatedName = updatedDetails.name || "";
    const updatedMobileNumber = updatedDetails.mobile;
    const updatedEmail = updatedDetails.email;
    const updatedAddress = updatedDetails.address || "";

    setTheCart(
      (prev) =>
        ({
          ...prev,
          checkout: {
            name: updatedName,
            contact: {
              mobileNumber: updatedMobileNumber,
              mail: updatedEmail
            } as CartCheckoutContactDocument,
            location: {
              address: updatedAddress,
              city: "",
              pincode: ""
            } as CartCheckoutLocationDocument,
            deliverToSomeoneElse:
              updatedDetails.type === "default" ? false : true,
            receiverName:
              updatedDetails.type === "default"
                ? ""
                : updatedDetails.receiverName,
            receiverMobileNumber:
              updatedDetails.type === "default"
                ? ""
                : updatedDetails.receiverMobile,
            occasion:
              updatedDetails.occasion && updatedDetails.occasion.length === 24
                ? updatedDetails.occasion
                : undefined
          } as CartCheckoutDocument
        }) as CartDocument
    );

    if (addresses.length === 0 && isUserLoggedIn && userLoggedIn) {
      // add address to this user
      const newAddress = {
        address: updatedAddress,
        city: updatedDetails.city,
        pincode: updatedDetails.pincode,
        type: "",
        isDefault: true
      } as CustomerAddressDocument;

      addAddressToCustomer(newAddress);
    }

    if (
      userLoggedIn &&
      isUserLoggedIn &&
      customerDetailsFromContext !== null &&
      (customerDetailsFromContext.name.length === 0 ||
        customerDetailsFromContext.mail === undefined ||
        customerDetailsFromContext.mail.length === 0 ||
        customerDetailsFromContext.mobileNumber === undefined ||
        customerDetailsFromContext.mobileNumber.length === 0)
    ) {
      const updatedCustomer = {
        name: customerDetailsFromContext.name || updatedName || "",
        mobileNumber:
          customerDetailsFromContext.mobileNumber || updatedMobileNumber || "",
        mail: customerDetailsFromContext.mail || updatedEmail || ""
      } as CustomerDetail;

      updateCustomerDetailsToContext(updatedCustomer);
    }

    // idk why this works only V
    setTimeout(() => setExclusiveInject((prev) => "delivery"), 300);
  };

  const updateMasterCartAppliedCoupon = (
    selectedCoupon: CouponDocument | null
  ) => {
    setTheCart(
      (prev) =>
        ({
          ...prev,
          coupon:
            selectedCoupon === null || selectedCoupon === undefined
              ? undefined
              : selectedCoupon
        }) as CartDocument
    );
    setUpdatePrice((prev) => true);
  };

  const clearAllCartData = () => {
    setTheCart(DEFAULT_CART_DOCUMENT);
    setUpdatePrice(true);
    setDontSaveToDB(true);

    /* // idk why this works only V
    setTimeout(() => {
      setExclusiveInject((prev) => "cart");
      setExclusiveInject((prev) => "delivery");
    }, 300); */

    setLocalStorageCartCoupon(null);
    setLocalStorageContentDocuments([]);
  };

  // CART EFFECTS ===================================================================
  useEffect(() => {
    if (theCart.items.length === 0) {
      setTheCart((prev) => ({ ...prev, coupon: undefined }) as CartDocument);
      setSaveToLS(true);
    }
  }, [theCart.items]);

  useEffect(() => {
    if (saveToLS) {
      setLocalStorageCartCoupon(extractAppliedCoupon(theCart));
      setLocalStorageCartDeliveryDetails(extractDeliveryDetails(theCart));
      setLocalStorageContentDocuments(theCart.items || []);
      setLocalStorageCartPrice(theCart.price.paymentPercentage || 100);

      setSaveToLS(false);
    }
  }, [saveToLS]);

  useEffect(() => {
    if (updatePrice) {
      updateMasterCartPrices({ cart: theCart, setCart: setTheCart });
      setUpdatePrice(false);

      setSaveToLS(true);
    }
  }, [updatePrice]);

  useEffect(() => {
    if (exclusiveInject !== "none") {
      if (exclusiveInject === "cart")
        setLocalStorageContentDocuments(theCart.items || []);
      else if (exclusiveInject === "delivery")
        setLocalStorageCartDeliveryDetails(extractDeliveryDetails(theCart));
      setExclusiveInject((prev) => "none");
    }
  }, [exclusiveInject]);

  useEffect(() => {
    if (!apiCalled) {
      // get whatever data from LS...
      const cartItemDocuments: CartItemDocument[] =
        getLocalStorageContentDocuments() || [];
      const appliedCoupon = getLocalStorageCartCoupon() || null;
      const paymentPercentage = getLocalStorageCartPrice() || 100;
      // const deliveryDetails = getLocalStorageCartDeliveryDetails() || {
      //   address: "",
      //   city: "",
      //   email: "",
      //   mobile: "",
      //   name: "",
      //   occasion: "",
      //   pincode: "",
      //   type: "default"
      // };
      const deliveryDetails = {
        address: addresses?.find(({ isDefault }) => isDefault)?.address || "",
        city: addresses?.find(({ isDefault }) => isDefault)?.city || "",
        email: customerDetailsFromContext?.mail || "",
        mobile: customerDetailsFromContext?.mobileNumber || "",
        name: customerDetailsFromContext?.name || "",
        occasion: "",
        pincode: "",
        type: "default"
      } as DeliveryDetailsType;

      setTheCart(
        (prev) => ({ ...prev, items: cartItemDocuments }) as CartDocument
      );
      updateMasterCartDeliveryDetails(deliveryDetails);
      updateMasterCartAppliedCoupon(appliedCoupon);
      // updateMasterCartPaymentPercentage(paymentPercentage);
      setUpdatePrice((prev) => true);
    }

    // GET ALL COUPONS ----------------------------
    fetchAllCoupons({
      active: true,
      orderBy: "asc",
      sortBy: "applicableCategories"
    })
      .then((response) => {
        const coupons = (response.data || []).filter((x) => x !== undefined);
        setAllCoupons((prev) => coupons);
      })
      .catch((err) => {
        // console.error("Failed to fetch coupons: ", err);
      });

    // GET OCCASIONS PRESETS ---------------------------------
    fetchOccasions({
      active: true,
      orderBy: "asc",
      sortBy: "name"
    })
      .then((response) => {
        const occasions = (response.data || []).filter((x) => x !== undefined);
        setALlOccasions((prev) => occasions);
      })
      .catch((err) => {
        // console.error("Failed to fetch occasions: ", err);
      });
  }, []);

  // API SYNCHRONIZATION ===============================================================
  useEffect(() => {
    if (isReady && customerId) {
      // login then read from api or push to api
      if (isUserLoggedIn && !apiCalled) {
        if (cartId && cartId.length) {
          setApiCalled((prev) => true);
          // console.log("Calling API once to read data from DB...");
          fetchCart({
            cartId,
            query: {
              populate: [
                { path: "items.content", populate: CONTENT_POPULATE },
                { path: "items.delivery.type", strict: false },
                {
                  path: "items.addons.addon",
                  populate: [{ path: "category" }, { path: "image" }]
                },
                { path: "items.customization.enhancement.items.enhancement" },
                { path: "items.customization.flavour.flavour" },
                { path: "items.customization.upgrade.upgrade" },
                { path: "items.customization.uploadedImage.images" }
              ]
            }
          }).then((cartData) => {
            // console.log({ cartDataFromAPI: cartData.data });
            if (cartData.data !== null) {
              const [shouldUpdateCart, mergedCartData] =
                mergeLocalAndAPICartData({
                  local: theCart,
                  fromAPI: cartData.data as CartDocument
                });

              if (shouldUpdateCart) {
                setTheCart((prev) => mergedCartData);
                setUpdatePrice((prev) => true);
              }
            }
          });
        } else {
          // save new cart document for this user and push cart id into context
          setTimeout(() => {
            if (
              (!cartId || !cartId.length) &&
              !saveCartAsNewDocToDB.triggered &&
              !saveCartAsNewDocToDB.truthy
            )
              setSaveCartAsNewDocToDB((prev) => ({
                triggered: false,
                truthy: true
              }));
          }, 8 * 1000);
        }
      }
    }
  }, [cartId, isUserLoggedIn, isReady, customerId]);

  // WHEN NO CART ID IS RECIEVED AFTER LOGIN THEN PUSH TO DB AS IS ------------
  useEffect(() => {
    if (
      !saveCartAsNewDocToDB.triggered &&
      saveCartAsNewDocToDB.truthy &&
      (!cartId || !cartId.length) &&
      theCart !== DEFAULT_CART_DOCUMENT
    ) {
      // console.log("No Cart Id received, pushing to database");
      addCart({
        data: removeLocalIds(
          excludePartialCheckout({
            ...theCart,
            customer: customerId
          } as CartDocument)
        ) as CartDocument
      }).then((cartData) => {
        console.log({ newCartData: cartData.data });
        const cartId = (cartData.data as CartDocument)._id as string;
        if (cartId && cartId.length) {
          addCartId(cartId);
        }
      });
      setSaveCartAsNewDocToDB((prev) => ({ triggered: true, truthy: false }));
    } else {
      // console.log(
      //   cartId + " ID already found, discarding pushing to database again"
      // );
    }
  }, [saveCartAsNewDocToDB]);

  // UPDATE CART DATA TO DATABASE -----------------------------------------------
  useEffect(() => {
    if (
      apiCalled &&
      isUserLoggedIn &&
      userLoggedIn &&
      cartId &&
      cartId.length &&
      !dontSaveToDB
    ) {
      updateCart({
        cartId,
        data: updateCartPrices(
          getDatabaseReadyCartDocument(
            removeLocalIds(excludePartialCheckout(theCart)) as CartDocument
          )
        )
      });
    }

    if (dontSaveToDB) {
      setDontSaveToDB((prev) => false);
    }

    // console.log({ theCart });
  }, [theCart]);

  // ERASE DATA LOCALLY WHEN USER IS LOGGING OUT ------------------------------------
  useEffect(() => {
    if (isUserLoggedIn && !userLoggedIn) {
      setUserLoggedIn((prev) => true);
    } else if (!isUserLoggedIn) {
      if (userLoggedIn) {
        // user is logging out at this point...
        // drop the cart items locally as such.
        // console.log("user logged out, wiping data out...");
        setTheCart((prev) => DEFAULT_CART_DOCUMENT);

        // idk why this works only V
        clearAllCartData();
      }
    }
  }, [isUserLoggedIn]);

  // CHECK IF CHECKOUT DETAILS IS ENTIRELY COMPLETE -------------------------------------------------
  useEffect(() => {
    const { checkout } = theCart;

    if (checkout) {
      let msg = "";

      if (checkout.name === undefined || checkout.name.length === 0)
        msg = "Name is not filled";
      else if (
        checkout.contact.mail === undefined ||
        checkout.contact.mail.length === 0 ||
        !REGEX_TEST.EMAIL.test(checkout.contact.mail)
      )
        msg = "Email is not complete or valid";
      else if (
        checkout.contact.mail === undefined ||
        checkout.contact.mobileNumber.length === 0 ||
        !REGEX_TEST.MOBILE.test(checkout.contact.mobileNumber)
      )
        msg = "Mobile no. is not complete or valid";
      else if (
        checkout.location.address === undefined ||
        checkout.location.address.length === 0
      )
        msg = "Address is not filled";
      else if (checkout.deliverToSomeoneElse) {
        if (
          checkout.receiverName === undefined ||
          checkout.receiverName.length === 0
        )
          msg = "Receiver Name is needed";
        else if (
          checkout.receiverMobileNumber === undefined ||
          checkout.receiverMobileNumber.length === 0
        )
          msg = "Receiver Mobile is needed";
      }

      if (msg.length === 0)
        setIsCheckoutComplete((prev) => ({ message: "", status: true }));
      else setIsCheckoutComplete((prev) => ({ message: msg, status: false }));
    } else
      setIsCheckoutComplete((prev) => ({
        status: false,
        message: "Checkout is incomplete"
      }));
  }, [theCart.checkout]);

  // useEffect(() => {
  //   console.log({ isCheckoutComplete });
  // }, [isCheckoutComplete]);

  // SET CUSTOMER ID INTO CART DOCUMENT -------------------------------------------------
  useEffect(() => {
    if (isReady && customerId && customerId.length) {
      // console.log(`....Customer ID added to cart: ${customerId}`);
      setTheCart((prev) => ({ ...prev, customer: customerId }) as CartDocument);
    }
  }, [isReady, customerId]);

  useEffect(() => {
    if (customerDetailsFromContext) {
      const { name, mail, mobileNumber } = customerDetailsFromContext;
      const defaultAddress =
        addresses.find(({ isDefault }) => isDefault) || addresses[0];

      setTheCart((prev) =>
        prev
          ? ({
              ...prev,
              checkout: prev.checkout
                ? ({
                    ...prev.checkout,
                    name:
                      prev.checkout.name && prev.checkout.name.length > 0
                        ? prev.checkout.name
                        : name,
                    contact: {
                      ...prev.checkout.contact,
                      mobileNumber:
                        prev.checkout.contact.mobileNumber &&
                        prev.checkout.contact.mobileNumber.length > 0
                          ? prev.checkout.contact.mobileNumber
                          : mobileNumber?.split("-")[1],
                      mail:
                        prev.checkout.contact.mail &&
                        prev.checkout.contact.mail.length > 0
                          ? prev.checkout.contact.mail
                          : mail
                    }
                  } as CartCheckoutDocument)
                : ({
                    name,
                    contact: {
                      mobileNumber: mobileNumber?.split("-")[1],
                      mail
                    },
                    location: {
                      address: defaultAddress ? defaultAddress.address : "",
                      city: "",
                      pincode: ""
                    }
                  } as CartCheckoutDocument)
            } as CartDocument)
          : prev
      );
    }
  }, [customerDetailsFromContext]);

  // useEffect(() => {
  //   if (selectedPincode !== null)
  //     setTheCart(
  //       (prev) =>
  //         ({
  //           ...prev,
  //           checkout: prev.checkout
  //             ? {
  //                 ...prev.checkout,
  //                 location: {
  //                   ...prev.checkout.location,
  //                   city:
  //                     (
  //                       (selectedPincode as PincodeDocument)
  //                         .city as CityDocument
  //                     ).name || "",
  //                   pincode: `${(selectedPincode as PincodeDocument).code}`
  //                 }
  //               }
  //             : prev
  //         }) as CartDocument
  //     );
  // }, [selectedPincode]);

  useEffect(() => {
    if (!theCart.checkout) {
      updateMasterCartDeliveryDetails({
        address: addresses?.find(({ isDefault }) => isDefault)?.address || "",
        city: addresses?.find(({ isDefault }) => isDefault)?.city || "",
        email: customerDetailsFromContext?.mail || "",
        mobile: customerDetailsFromContext?.mobileNumber?.split("-")[1] || "",
        name: customerDetailsFromContext?.name || "",
        occasion: "",
        pincode: "",
        type: "default"
      } as DeliveryDetailsType);
    }
  }, [theCart.checkout]);

  return (
    <Cart.Provider
      value={{
        data: {
          items: extractCartItems({
            cart: theCart,
            selectedCity
          }),
          itemDetails: extractCartDetails(theCart),
          price: extractPrice(theCart),
          deliveryDetails: extractDeliveryDetails(theCart),
          appliedCoupon: extractAppliedCoupon(theCart),
          allCoupons: filterRelevantCoupons({
            allCoupons,
            itemsInCart: theCart.items
          }),
          partialPercentage: getPartialPercentage(theCart.items),
          occasions: allOccasions,
          isCheckoutComplete
        },
        addToCartFunctions: {
          addItem: addItemToCart
        },
        cartFunctions: {
          updateCartContext: {
            updateDeliveryDetails: updateMasterCartDeliveryDetails,
            updateItems: updateMasterCartItems,
            updatePaymentPercentage: updateMasterCartPaymentPercentage,
            updateSelectedCoupon: updateMasterCartAppliedCoupon
          },
          clearCart: clearAllCartData
        }
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
