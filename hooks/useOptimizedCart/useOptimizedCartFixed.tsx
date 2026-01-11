"use client";

// constants
import { initialCartPrice } from "./constants/initialCartPrice";

// utils
import { createContext } from "react";

// hooks
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAppStates } from "../useAppState/useAppState";

// types
import { isDateExpired } from "@/app/api/frontend/cart/utils/isDateExpired";
import { ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";
import { CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";
import { CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { addCart, fetchCart } from "@/request/dynamic/cart";
import { type ReactNode } from "react";
import { useCustomerProfile } from "../useCustomerProfile";
import { getInitialCart } from "./utils/getInitialCart";

const SHOW_STATUS_LOGS = false; // Disable excessive logging in production

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

  // Refs for preventing infinite loops and duplicate API calls
  const initializationRef = useRef(false);
  const cloudSyncRef = useRef(false);
  const isLoadingRef = useRef(false);
  const lastCartIdRef = useRef<string>("");
  const lastSelectedCityRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  // states
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [cart, setCart] = useState<CartDocument | null>(null);
  const [cartCloud, setCartCloud] = useState<CartDocument | null>(null);

  // Memoized calculations to prevent unnecessary recalculations
  const items = useMemo(() => cart?.items || [], [cart?.items]);
  const price = useMemo(() => cart?.price || initialCartPrice, [cart?.price]);

  const savingAmount = useMemo(() => {
    if (!cart?.items || !selectedCity) return 0;

    return cart.items.reduce((total, { content, quantity }) => {
      const { mrp, price } =
        (content as ContentDocument)?.price?.cities?.find(
          ({ city }) => city === selectedCity?._id
        ) || (content as ContentDocument).price!.base;

      return total + (mrp - price) * quantity;
    }, 0) + (price?.couponDiscount || 0);
  }, [cart?.items, selectedCity, price?.couponDiscount]);

  const maxPaymentPercentage = useMemo(() => {
    if (!cart?.items) return 100;

    return cart.items.reduce((max, { content }) => {
      const contentDoc = content as ContentDocument;
      return Math.max(
        (
          (contentDoc?.category?.primary as ContentCategoryDocument)?.charges
            ?.advancePayment as AdvancePaymentDocument
        )?.value || 100,
        max
      );
    }, 0) || 100;
  }, [cart?.items]);

  const coupon = useMemo(() =>
    cart?.coupon ? (cart?.coupon as CouponDocument) : undefined,
    [cart?.coupon]
  );

  // Debounced cart validation
  const handleValidateCartItems = useCallback((
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
  }, []);

  // Optimized price calculation
  const handleUpdatePrice = useCallback((cart: CartDocument): CartDocument => {
    if (!selectedCity) return cart;

    const updatedCartItems = cart.items.map((item) => {
      const updatedItem = { ...item };
      const content = item.content as ContentDocument;
      const cityPrice = content.price?.cities?.find(
        ({ city }) => city === selectedCity?._id
      );

      updatedItem.pricePerUnit = cityPrice?.price || content.price!.base.price;
      return updatedItem as CartItemDocument;
    });

    const newMaxPaymentPercentage = updatedCartItems.reduce((max, { content }) => {
      const contentDoc = content as ContentDocument;
      return Math.max(
        (
          (contentDoc?.category?.primary as ContentCategoryDocument)?.charges
            ?.advancePayment as AdvancePaymentDocument
        )?.value || 100,
        max
      );
    }, 0) || 100;

    const content = updatedCartItems.reduce(
      (total, { pricePerUnit, quantity }) => total + pricePerUnit * quantity,
      0
    ) || 0;

    const addon = updatedCartItems.reduce(
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

    const total = content + addon + customization + deliveryCharge - cart.price.couponDiscount;
    const payable = cart.price.paymentPercentage !== newMaxPaymentPercentage ||
      cart.price.paymentPercentage === 100
      ? total
      : Math.ceil((content + customization) * (cart.price.paymentPercentage / 100)) +
      addon + deliveryCharge;
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
        paymentPercentage: cart.price.paymentPercentage === newMaxPaymentPercentage
          ? newMaxPaymentPercentage
          : 100,
        payable,
        due
      } as CartPriceDocument
    } as CartDocument;
  }, [selectedCity]);

  // Initialize cart only once
  const handleInitializeCart = useCallback(async () => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    if (SHOW_STATUS_LOGS) console.log("handleInitializeCart - ONCE");

    const newCart = getInitialCart(customerId || "");
    setCart(newCart);
    setCartLocal(newCart);
  }, [customerId, setCartLocal]);

  // Handle initial load with proper guards
  const handleInitialLoad = useCallback(async () => {
    if (!isLocalReady || initializationRef.current) return;

    if (SHOW_STATUS_LOGS) console.log("handleInitialLoad");

    if (cartLocal) {
      const validCart = { ...cartLocal } as CartDocument;
      const validCartItems = handleValidateCartItems(validCart.items || []);

      if (JSON.stringify(validCart.items) !== JSON.stringify(validCartItems)) {
        validCart.items = validCartItems;
      }

      const recalculatedValidCart = handleUpdatePrice(validCart);
      setCart(recalculatedValidCart);
      setCartLocal(recalculatedValidCart);
    } else {
      await handleInitializeCart();
    }

    setIsReady(true);
  }, [isLocalReady, cartLocal, handleValidateCartItems, handleUpdatePrice, handleInitializeCart, setCartLocal]);

  // Optimized cloud sync with abort controller
  const handleCloudSync = useCallback(async () => {
    if (!isAuthenticated || !isReady || cloudSyncRef.current || isLoadingRef.current) return;

    cloudSyncRef.current = true;
    isLoadingRef.current = true;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      if (profileCartId && profileCartId !== lastCartIdRef.current) {
        lastCartIdRef.current = profileCartId;

        const response = await fetchCart(profileCartId);
        if (response?.data && !abortControllerRef.current.signal.aborted) {
          setCartCloud(response.data as CartDocument);
        }
      } else if (!profileCartId && cart) {
        const dbCart = getDBCart(cart);
        const response = await addCart(dbCart);

        if (response?.data && !abortControllerRef.current.signal.aborted) {
          onChangeCustomerCartId(cart._id as string);
        }
      }
    } catch (error) {
      if (!abortControllerRef.current.signal.aborted) {
        console.error("Cart sync error:", error);
      }
    } finally {
      isLoadingRef.current = false;
      cloudSyncRef.current = false;
    }
  }, [isAuthenticated, isReady, profileCartId, cart, onChangeCustomerCartId]);

  // Optimized coupon handler
  const handleChangeCoupon = useCallback((coupon?: CouponDocument) => {
    if (!cart) return;

    const { content, addon, customization, deliveryCharge } = cart.price;

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
                (content + customization) * (coupon.discount!.percentage! / 100)
              ),
              coupon.discount!.limit
            );
          }
        }
      })()
      : 0;

    const updatedCart = {
      ...cart,
      price: {
        ...cart.price,
        ...(coupon
          ? {
            paymentPercentage: 100,
            couponDiscount: newCouponDiscount,
            total: content + addon + customization + deliveryCharge - newCouponDiscount,
            payable: content + addon + customization + deliveryCharge - newCouponDiscount,
            due: 0
          }
          : {
            couponDiscount: 0,
            total: content + addon + customization + deliveryCharge,
            payable: content + addon + customization + deliveryCharge
          })
      },
      coupon
    } as CartDocument;

    setCart(updatedCart);
    setCartLocal(updatedCart);
  }, [cart, setCartLocal]);

  const handleChangePaymentPercentage = useCallback((paymentPercentage: number) => {
    if (!cart) return;

    const updatedCart = {
      ...cart,
      price: {
        ...price,
        paymentPercentage,
        ...(paymentPercentage === 100 ? {} : { couponDiscount: 0 })
      } as CartPriceDocument,
      ...(paymentPercentage === 100 ? {} : { coupon: undefined })
    } as CartDocument;

    setCart(updatedCart);
    setCartLocal(updatedCart);
  }, [cart, price, setCartLocal]);

  const getDBCart = useCallback((cart: CartDocument): CartDocument => ({
    _id: cart._id,
    isOrdered: cart.isOrdered,
    customer: cart.customer || customerId || "",
    items: cart.items.map((item) => {
      const dbItem = { ...item } as CartItemDocument;

      dbItem.content = (dbItem.content as ContentDocument)._id as string;
      dbItem.delivery = {
        ...dbItem.delivery,
        ...(dbItem.delivery?.type
          ? { type: (dbItem.delivery.type as DeliveryTypeDocument)._id as string }
          : {}),
        ...(dbItem.delivery?.slot
          ? { slot: (dbItem.delivery.slot as TimeSlotDocument)._id as string }
          : {})
      } as CartItemDeliveryDocument;

      if (dbItem?.addons?.length) {
        dbItem.addons = dbItem.addons.map((itemAddon) => {
          const dbItemAddon = { ...itemAddon } as CartItemAddonDocument;
          dbItemAddon.addon = (dbItemAddon.addon as AddonDocument)._id as string;
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
        dbItem.customization = {
          ...(dbItem?.customization?.enhancement?.items?.length
            ? {
              enhancement: {
                ...dbItem.customization.enhancement,
                items: dbItem.customization.enhancement.items.map(
                  (enhancement) => {
                    const dbEnhancement = { ...enhancement } as CartItemEnhancementItemDocument;
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
                upgrade: (dbItem.customization.upgrade.upgrade as UpgradeDocument)._id as string
              } as CartItemUpgradeDocument
            }
            : {}),
          ...(dbItem?.customization?.flavour
            ? {
              flavour: {
                ...dbItem.customization.flavour,
                flavour: (dbItem.customization.flavour.flavour as FlavourDocument)._id as string
              } as CartItemFlavourDocument
            }
            : {}),
          ...(dbItem?.customization?.balloonColor
            ? { balloonColor: dbItem.customization.balloonColor }
            : {}),
          ...(dbItem?.customization?.uploadedText
            ? { uploadedText: dbItem.customization.uploadedText }
            : {}),
          ...(dbItem?.customization?.uploadedImage
            ? { uploadedImage: dbItem.customization.uploadedImage }
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
  }) as CartDocument, [customerId]);

  // Mount effect - runs only once
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initial load effect - runs once when ready
  useEffect(() => {
    if (isMounted && isLocalReady && !initializationRef.current) {
      handleInitialLoad();
    }
  }, [isMounted, isLocalReady, handleInitialLoad]);

  // Cloud sync effect - debounced and guarded
  useEffect(() => {
    if (isReady && isAuthenticated) {
      const timeoutId = setTimeout(() => {
        handleCloudSync();
      }, 300); // Debounce cloud sync

      return () => clearTimeout(timeoutId);
    }
  }, [isReady, isAuthenticated, handleCloudSync]);

  // City change effect - only when city actually changes
  useEffect(() => {
    if (isReady && cart && selectedCity?._id !== lastSelectedCityRef.current) {
      lastSelectedCityRef.current = selectedCity?._id as string || "";
      const updatedCart = handleUpdatePrice(cart);
      setCart(updatedCart);
      setCartLocal(updatedCart);
    }
  }, [isReady, cart, selectedCity, handleUpdatePrice, setCartLocal]);

  // Cloud cart sync effect
  useEffect(() => {
    if (cartCloud && cartCloud !== cart) {
      if (cartCloud.isOrdered) {
        onChangeCustomerCartId("");
      } else {
        const updatedCart = handleUpdatePrice(cartCloud);
        setCart(updatedCart);
        setCartLocal(updatedCart);
      }
    }
  }, [cartCloud, cart, handleUpdatePrice, setCartLocal, onChangeCustomerCartId]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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