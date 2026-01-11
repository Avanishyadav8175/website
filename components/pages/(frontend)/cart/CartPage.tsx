"use client";

// icons
import { Loader2 } from "lucide-react";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// utils
import { lazy, useState } from "react";

// hooks
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartCheckout from "@/components/(frontend)/cart/delivery/CartCheckout";
import CartCouponSection from "@/components/(frontend)/cart/coupon/CartCouponSection";
import CartItems from "@/components/(frontend)/cart/items/CartItems";
import CartPrice from "@/components/(frontend)/cart/price/CartPrice";
import CartSavingAmount from "@/components/(frontend)/cart/savingAmount/CartSavingAmount";
import CartPaymentButton from "@/components/(frontend)/cart/paymentButton/CartPaymentButton";
import CartPaymentPercentage from "@/components/(frontend)/cart/paymentPercentage/CartPaymentPercentage";
const CustomerAuth = lazy(
  () => import("@/components/(frontend)/auth/CustomerAuth")
);
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import ShopMore from "@/components/(frontend)/cart/shopMore/ShopMore";
import { Suspense } from "react";
import { SettingProvider } from "@/hooks/useSetting/useSetting";

export default function CartPage() {
  // hooks
  const { isReady, items } = useCart();

  // states
  const [showCheckoutDetail, setShowCheckoutDetail] = useState<boolean>(false);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 sm:col-span-2 h-[80dvh] ">
        <span className="flex items-center justify-center gap-2 text-2xl">
          <span>Loading</span>
          <Loader2 className="animate-spin" />
        </span>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 sm:col-span-2 h-[80dvh] ">
        <span className="text-2xl">Your Cart is Empty</span>
        <span className="text-sm text-charcoal-3/60">
          Start with adding an item of choice
        </span>
        <Link
          href={"/"}
          className="mt-5 bg-charcoal rounded-lg px-6 py-2 text-sienna-3 font-light sm:text-sm transition-all duration-300 hover:text-charcoal-3 hover:bg-sienna/70"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* <CartSavingAmount /> */}
      <CartItems />
      <CartPrice />
      <CartCouponSection />
      <CartPaymentPercentage />
      <CartCheckout
        showCheckoutDetail={showCheckoutDetail}
        onChangeShowCheckoutDetail={setShowCheckoutDetail}
      />
      <SettingProvider>
        <CartPaymentButton onChangeShowCheckoutDetail={setShowCheckoutDetail} />
      </SettingProvider>
      {/* <ShopMore /> */}
      <Suspense>
        <CustomerAuth />
      </Suspense>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
