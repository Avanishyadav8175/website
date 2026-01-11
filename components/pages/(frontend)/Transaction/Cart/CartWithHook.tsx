"use client";
import FrontendCartBottomStickyBar from "@/components/(frontend)/transaction/cart/CartSummary/CartBottomStickyBar";
import FrontendCartItems from "@/components/(frontend)/transaction/cart/CartItems/CartItems";
import FrontendCartSummary from "@/components/(frontend)/transaction/cart/CartSummary/CartSummary";
import CartSavingMsg from "@/components/(frontend)/transaction/cart/SavingsMsg";
import { useEffect, useState } from "react";
import DeliveryAddress from "@/components/(frontend)/transaction/cart/DeliveryAddress/CartDeliveryAddress";
import FrontendCartCoupons from "@/components/(frontend)/transaction/cart/CartCoupon/CartCoupons";
import FrontendCartPaymentPercentageSelector from "@/components/(frontend)/transaction/cart/CartSummary/CartPaymentPercentage";
import { BasicImageType } from "@/common/types/types";
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";
import CustomerAuth from "@/components/(frontend)/auth/CustomerAuth";
import { getTotalCartAmount } from "@/components/(frontend)/transaction/utils/getTotalCartAmount";
import { usePayment } from "@/hooks/usePayment/usePayment";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import Image from "next/image";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { useAppStates } from "@/hooks/useAppState/useAppState";

export type CartItemType = {
  _id: string;
  contentId: string;
  name: string;
  mrp: number;
  link: string;
  pricePerUnit: number;
  image: BasicImageType;
  edibleType: "veg" | "non-veg" | "unspecified" | "non-edible";
  date: Date;
  time: TimeSlotDocument;
  deliveryType: string | null;
  customizations: {
    count: number;
    data: CartItemCustomizationDocument | undefined;
  };
  deliveryDocument: ContentDeliveryDocument | undefined;
  addons: {
    _id: string;
    image: BasicImageType;
    name: string;
    pricePerUnit: number;
  }[];
};

export type TransactionPriceSummaryType = {
  base: number;
  addon: number;
  paymentPercentage: number;
  coupon: number;
  platform: number;
};

export type DeliveryDetailsType = {
  address: string;
  pincode: string;
  city: string;
  name: string;
  email: string;
  mobile: string;
  occasion: string;
} & (
  | {
      type: "default";
    }
  | {
      type: "gift";
      receiverName: string;
      receiverMobile: string;
    }
);

export default function CartWithHook() {
  const {
    auth: {
      data: { isAuthenticated },
      method: { onChangeShowAuth }
    }
  } = useAppStates();
  const {
    data: {
      items: cartItems,
      itemDetails: itemChoices,
      price: priceSummary,
      appliedCoupon,
      allCoupons: coupons,
      partialPercentage,
      isCheckoutComplete
    },
    cartFunctions: {
      updateCartContext: { updatePaymentPercentage }
    }
  } = useCart();
  const { onInitiateNewPayment } = usePayment();

  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);
  const [currCoupon, setCurrCoupon] = useState<CouponDocument | null>(null);
  const [popPoppers, setPopPoppers] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "payu">(
    "razorpay"
  );
  const [openCheckout, setOpenCheckout] = useState<boolean>(false);

  // collapse how it works if 100% payment is selected -----------------
  useEffect(
    () =>
      priceSummary.paymentPercentage === 100
        ? setShowHowItWorks((prev) => false)
        : undefined,
    [priceSummary.paymentPercentage]
  );

  useEffect(() => {
    if (!isAuthenticated && priceSummary.paymentPercentage !== 100)
      updatePaymentPercentage(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (appliedCoupon) {
      if (currCoupon && appliedCoupon.code === currCoupon.code)
        setPopPoppers((prev) => false);
      else if (currCoupon && appliedCoupon.code !== currCoupon.code) {
        setPopPoppers((prev) => true);
        setCurrCoupon((prev) => appliedCoupon);
      } else {
        setPopPoppers((prev) => false);
        setCurrCoupon((prev) => appliedCoupon);
      }
    } else if (appliedCoupon === null) {
      setPopPoppers((prev) => false);
      setCurrCoupon((prev) => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedCoupon]);

  useEffect(() => {
    if (popPoppers) {
      setPopPoppers((prev) => false);
    }
  }, [popPoppers]);

  useEffect(() => {
    if (openCheckout) setTimeout(() => setOpenCheckout((prev) => false), 1000);
  }, [openCheckout]);

  useEffect(() => {
    if (priceSummary.paymentPercentage < partialPercentage) {
      updatePaymentPercentage(partialPercentage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partialPercentage]);

  if (cartItems.length === 0)
    return (
      <>
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

        {/* <div className="flex flex-col justify-center items-center col-span-2 pt-8 pb-16">
          <span className="text-lg">Popular Categories</span>
          <div className="pt-5 w-full">
            <CategoryTiles
              categoryList={dummyCategoryData.map((arr) => ({
                _id: arr[0],
                label: arr[1],
                link: arr[2],
                image: { url: arr[3], alt: arr[4] }
              }))}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center col-span-2 pb-24 ">
          <span className="text-lg">Top Selling Products</span>
          <div className="pt-5 w-full">
            <ProductTiles
              productList={productList}
              type="scrollable"
            />
          </div>
        </div> */}
      </>
    );

  return (
    <>
      <DeliveryAddress
        isLoggedin={isAuthenticated}
        setShowLogin={onChangeShowAuth}
        openCheckout={openCheckout}
      />

      <CartSavingMsg
        cartItems={cartItems}
        itemChoices={itemChoices}
      />

      <FrontendCartItems
        cartItems={cartItems}
        itemChoices={itemChoices}
      />

      <FrontendCartCoupons
        paymentPercentage={priceSummary.paymentPercentage}
        priceSummary={priceSummary}
        appliedCoupon={appliedCoupon}
        availableCoupons={coupons}
        hideOnDesktop
      />

      <FrontendCartSummary
        priceSummary={priceSummary}
        appliedCoupon={appliedCoupon}
        showHowItWorks={showHowItWorks}
        setShowHowItWorks={setShowHowItWorks}
        hideOnDesktop
      />

      {isAuthenticated && partialPercentage < 100 ? (
        <FrontendCartPaymentPercentageSelector
          setPercentage={(selectedPercentage: number) =>
            updatePaymentPercentage(selectedPercentage)
          }
          partialPercentage={partialPercentage}
          selected={priceSummary.paymentPercentage}
          hideOnDesktop
        />
      ) : (
        <></>
      )}

      {/* ON DESKTOP RIGHT STICKY SUMMARY ------------------------------------- */}
      <div className="max-sm:hidden sm:col-start-2 sm:row-span-8 sm:sticky top-14 h-[calc(100dvh_-_56px)] flex flex-col justify-start overflow-y-scroll scrollbar-hide">
        <FrontendCartCoupons
          paymentPercentage={priceSummary.paymentPercentage}
          appliedCoupon={appliedCoupon}
          availableCoupons={coupons}
          priceSummary={priceSummary}
        />

        <FrontendCartSummary
          priceSummary={priceSummary}
          appliedCoupon={appliedCoupon}
          showHowItWorks={showHowItWorks}
          setShowHowItWorks={setShowHowItWorks}
        />

        {isAuthenticated && partialPercentage < 100 ? (
          <FrontendCartPaymentPercentageSelector
            setPercentage={(selectedPercentage: number) =>
              updatePaymentPercentage(selectedPercentage)
            }
            partialPercentage={partialPercentage}
            selected={priceSummary.paymentPercentage}
          />
        ) : (
          <></>
        )}

        {/* LOGIN + PAY BTN ------------------------------------ */}
        <HorizontalSpacing className="sticky bottom-0 flex flex-col justify-center bg-gradient-to-t from-[#fafafa] from-75% to-transparent max-sm:!px-2.5">
          {isAuthenticated ? (
            <div className="bg-gradient-to-t from-[#fafafa] from-75% to-transparent pt-2 sm:pt-4 pb-8 sm:-mt-1 text-sm max-sm:shadow-sm -z-0 grid grid-cols-[37px_1fr_auto] gap-x-2.5 overflow-hidden">
              <div className="border border-charcoal-3/40 rounded-lg overflow-hidden relative aspect-square grid place-items-center p-1.5">
                <Image
                  src={
                    paymentMethod === "razorpay"
                      ? "/logo/razorpay.png"
                      : "/logo/payu.webp"
                  }
                  alt={paymentMethod}
                  draggable={false}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover object-center scale-105"
                  unoptimized={!OPTIMIZE_IMAGE}
                />
              </div>
              <div className="flex flex-col justify-start">
                <span className="text-charcoal-3/80">Payment Partner</span>
                <span className="font-medium leading-tight flex items-center justify-start gap-x-1">
                  <span>
                    {paymentMethod === "razorpay" ? "Razorpay" : "PayU"}
                  </span>
                  <span className="p-[3px] text-white bg-green-500 scale-[0.75] rounded-full grid place-items-center">
                    <Check
                      strokeWidth={1.5}
                      width={12}
                      height={12}
                    />
                  </span>
                </span>
              </div>
              <div className="group flex items-center justify-end">
                <div className="flex items-center justify-end gap-x-0.5 font-medium text-blue-600 cursor-pointer hover:underline hover:underline-offset-2 group-hover:opacity-0 transition-all duration-300">
                  <span>Change</span>
                  <ChevronRight
                    width={15}
                    height={15}
                    className="translate-y-px"
                  />
                </div>
                <div className="*:cursor-pointer text-[13px] grid grid-cols-[auto_20px] gap-y-px text-right font-medium items-center transition-all duration-300 w-0 group-hover:w-20 opacity-0 group-hover:opacity-100">
                  <span
                    onClick={() => setPaymentMethod((prev) => "razorpay")}
                    className="pr-2.5"
                  >
                    Razorpay
                  </span>
                  <span
                    onClick={() => setPaymentMethod((prev) => "razorpay")}
                    className={`rounded-full aspect-square w-2  ${paymentMethod === "razorpay" ? "ring-1 ring-offset-1 ring-blue-500 bg-blue-500" : "bg-charcoal-3/55"} transition-all duration-300`}
                  />
                  <span
                    onClick={() => setPaymentMethod((prev) => "payu")}
                    className="pr-2.5"
                  >
                    PayU
                  </span>
                  <span
                    onClick={() => setPaymentMethod((prev) => "payu")}
                    className={`rounded-full aspect-square w-2  ${paymentMethod === "payu" ? "ring-1 ring-offset-1 ring-blue-500 bg-blue-500" : "bg-charcoal-3/55"} transition-all duration-300`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            onClick={
              isAuthenticated
                ? isCheckoutComplete.status
                  ? () => {
                      // setShowPaymentGateway(true);
                      // onInitiateNewPayment({
                      //   gateway: "razorpay",
                      //   amount: getTotalCartAmount(priceSummary).payableAmount,
                      //   percentage: priceSummary.paymentPercentage
                      // });
                    }
                  : () => setOpenCheckout((prev) => true)
                : (e) => {
                    e.preventDefault();
                    onChangeShowAuth(true);
                  }
            }
            className={`z-10 ${isAuthenticated ? "-translate-y-[25px]" : ""} group relative flex items-center justify-center cursor-pointer rounded-xl text-lg ${isAuthenticated ? (isCheckoutComplete.status ? "bg-green-600 brightness-110" : "bg-[#727272] opacity-85") : "bg-[#727272]"} text-white py-3.5 px-3.5 transition-all duration-300`}
          >
            <span className="group-hover:-translate-x-1.5 transition-all duration-200">
              {isAuthenticated
                ? isCheckoutComplete.status
                  ? "Proceed to Pay"
                  : "Complete Checkout to Pay"
                : "Login to Proceed"}
            </span>
            <ArrowRight
              strokeWidth={1.5}
              width={21}
              className="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            />

            <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/45 opacity-50 rotate-12 blur-sm z-30 top-0 animate-shine-infinite-slow" />
          </div>
        </HorizontalSpacing>

        {!isAuthenticated ? (
          <HorizontalSpacing className="mt-4 text-center -translate-x-2">
            <Link
              href={"/"}
              className="text-charcoal-3/70 transition-all duration-300 hover:underline hover:underline-offset-4"
            >
              I wish to Shop More
            </Link>
          </HorizontalSpacing>
        ) : (
          <></>
        )}
      </div>

      {/* ON MOBILE BOTTOM STICKY BAR ------------------------------------- */}
      <FrontendCartBottomStickyBar
        priceSummary={priceSummary}
        isLoggedin={isAuthenticated}
        showLogin={() => {
          onChangeShowAuth(true);
        }}
        isCheckoutComplete={isCheckoutComplete}
        openCheckout={() => setOpenCheckout((prev) => true)}
      />

      {/* LOGIN SHEET ---------------------------------- */}
      <CustomerAuth />
    </>
  );
}
