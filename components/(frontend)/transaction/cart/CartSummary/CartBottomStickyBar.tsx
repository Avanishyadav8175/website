import { INRSymbol } from "@/common/constants/symbols";
import {
  DeliveryDetailsType,
  TransactionPriceSummaryType
} from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { ArrowRight, Check, ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
import Image from "next/image";
import { OPTIMIZE_IMAGE } from "@/config/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import SelectDeliveryAddressPopupUI from "../DeliveryAddress/components/SelectDeliveryAddressPopupUI";
import { useCart } from "@/hooks/useCart";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";
import { usePayment } from "@/hooks/usePayment/usePayment";
import { useAppStates } from "@/hooks/useAppState/useAppState";

const EMPTY_ADDRESS_FIELD_PLACEHOLDER = "Address is Required";
const INCOMPLETE_CHECKOUT_PLACEHOLDER = "Complete Checkout";

export default function FrontendCartBottomStickyBar({
  priceSummary,
  isLoggedin,
  isCheckoutComplete,
  showLogin,
  openCheckout
}: {
  priceSummary: TransactionPriceSummaryType;
  isLoggedin: boolean;
  showLogin: () => void;
  isCheckoutComplete: {
    status: boolean;
    message: string;
  };
  openCheckout: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "pay-u">(
    "razorpay"
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [localDeliveryDetails, setLocalDeliveryDetails] =
    useState<DeliveryDetailsType>({
      address: "",
      city: "",
      email: "",
      mobile: "",
      name: "",
      occasion: "",
      pincode: "",
      type: "default"
    });

  const {
    auth: {
      data: { isAuthenticated },
      method: { onChangeShowAuth }
    }
  } = useAppStates();
  const { onInitiateNewPayment } = usePayment();

  const {
    cartFunctions: {
      updateCartContext: {
        updateDeliveryDetails: updateCartContextDeliveryDetails
      }
    },
    data: { deliveryDetails, occasions }
  } = useCart();

  const summary = getTotalCartAmount(priceSummary);

  const addressData = {
    address: deliveryDetails.address
      ? `${deliveryDetails.address}${deliveryDetails.pincode ? `• ${deliveryDetails.pincode}` : ""}${deliveryDetails.city ? `, ${deliveryDetails.city}` : ""}`
      : EMPTY_ADDRESS_FIELD_PLACEHOLDER,
    secondary:
      deliveryDetails.name && (deliveryDetails.mobile || deliveryDetails.email)
        ? `${deliveryDetails.name} ${deliveryDetails.mobile ? `• ${deliveryDetails.mobile}` : ""} ${deliveryDetails.email && !deliveryDetails.mobile ? `• ${deliveryDetails.email}` : ""}`
        : INCOMPLETE_CHECKOUT_PLACEHOLDER
  };

  useEffect(() => {
    setLocalDeliveryDetails((prev) => deliveryDetails);
  }, [deliveryDetails]);

  return (
    <div className="px-2.5 sm:hidden sticky bottom-0 min-h-fit pb-1.5 *:px-3 bg-ivory-1 z-[200] border-y border-y-ash/55 grid grid-cols-5 gap-2 justify-between">
      {isLoggedin ? (
        <>
          {/* address row ---------------------- */}
          <div className="row-start-1 col-span-5 grid grid-cols-[44px_1fr_auto] gap-x-3.5 items-center py-2.5 border-b border-ash/55">
            <div className="aspect-square relative grid place-items-center border border-charcoal-3/20 rounded-lg p-2">
              <MapPin
                strokeWidth={1.5}
                width={18}
                height={18}
              />
              {addressData.secondary === INCOMPLETE_CHECKOUT_PLACEHOLDER ||
              addressData.address === EMPTY_ADDRESS_FIELD_PLACEHOLDER ? (
                <></>
              ) : (
                <div className="bg-green-500 rounded-full flex items-center justify-center p-0.5 text-white absolute -right-1.5 -top-1.5">
                  <Check
                    strokeWidth={1.5}
                    width={12}
                    height={12}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-start text-sm text-charcoal-3/90">
              <div
                className={`text-base line-clamp-1 ${addressData.address === EMPTY_ADDRESS_FIELD_PLACEHOLDER ? "text-red-500" : ""}`}
              >
                {addressData.address}
              </div>
              <div
                className={`text-charcoal-3/70 line-clamp-1 ${addressData.secondary === INCOMPLETE_CHECKOUT_PLACEHOLDER ? "text-red-400" : ""}`}
              >
                {addressData.secondary}
              </div>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <span className="font-semibold tracking-wide text-moss">
                  EDIT
                </span>
              </DrawerTrigger>
              <DrawerContent className="z-[996] outline-none border-none p-0 max-h-[95dvh] min-h-fit rounded-t-3xl">
                <SelectDeliveryAddressPopupUI
                  closeDialog={() => setOpenDialog((prev) => false)}
                  deliveryDetails={localDeliveryDetails}
                  updateDeliveryDetails={(
                    updatedDeliveryDetails: DeliveryDetailsType
                  ) =>
                    setLocalDeliveryDetails((prev) => updatedDeliveryDetails)
                  }
                  onCloseAction={() =>
                    updateCartContextDeliveryDetails(localDeliveryDetails)
                  }
                  occasions={occasions}
                />
              </DrawerContent>
            </Drawer>
          </div>

          {/* left side ---------------- */}
          <Drawer>
            <DrawerTrigger asChild>
              <div className="row-start-2 col-span-2 flex flex-col items-start justify-center space-y-0.5 translate-y-px">
                <span className="text-charcoal-3/50 text-[15px] sm:hidden leading-none">
                  Pay using
                </span>
                <span className="text-base font-medium flex items-center justify-start gap-1 text-charcoal-3/90">
                  <div className="aspect-square w-[18px] relative overflow-hidden">
                    <Image
                      src={
                        paymentMethod === "razorpay"
                          ? "/logo/razorpay.png"
                          : "/logo/payu.webp"
                      }
                      alt={paymentMethod === "pay-u" ? "PayU" : "Razorpay"}
                      decoding="async"
                      draggable={false}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover object-center scale-105"
                      unoptimized={!OPTIMIZE_IMAGE}
                    />
                  </div>
                  <span>{paymentMethod === "pay-u" ? "PayU" : "Razorpay"}</span>
                  <ChevronDown
                    width={13}
                    height={13}
                  />
                </span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-3xl bg-ivory-1 border-none outline-none px-3.5 pt-8 pb-6 z-[996]">
              <span className="text-xl text-charcoal-3 text-center mb-6">
                Select Payment Partner
              </span>
              <div className="grid grid-cols-1 gap-3.5">
                <DrawerClose asChild>
                  <div
                    onClick={() => setPaymentMethod((prev) => "razorpay")}
                    className={`transition-all duration-300 cursor-pointer px-4 py-3 rounded-xl flex items-center justify-between text-[17px] font-medium gap-x-2 border ${paymentMethod === "razorpay" ? "bg-blue-50 border-blue-200 text-blue-500" : "border-charcoal-3/25 bg-charcoal-3/5 text-charcoal-3/85"}`}
                  >
                    <div className="flex items-center justify-start gap-x-2">
                      <div className="aspect-square w-[22px] relative overflow-hidden">
                        <Image
                          src={"/logo/razorpay.png"}
                          alt={paymentMethod === "pay-u" ? "PayU" : "Razorpay"}
                          decoding="async"
                          draggable={false}
                          width={18}
                          height={18}
                          className="w-full h-full object-cover object-center scale-105"
                          unoptimized={!OPTIMIZE_IMAGE}
                        />
                      </div>
                      <span>Razorpay</span>
                    </div>
                    <div
                      className={`relative justify-self-end aspect-square rounded-full ${paymentMethod === "razorpay" ? "bg-blue-500 ring-2 ring-offset-2 ring-blue-500" : "bg-charcoal-3/50"} w-3`}
                    />
                  </div>
                </DrawerClose>

                <DrawerClose asChild>
                  <div
                    onClick={() => setPaymentMethod((prev) => "pay-u")}
                    className={`transition-all duration-300 cursor-pointer px-4 py-3 rounded-xl flex items-center justify-between text-[17px] font-medium gap-x-2 border ${paymentMethod === "pay-u" ? "bg-blue-50 border-blue-200 text-blue-500" : "border-charcoal-3/25 bg-charcoal-3/5 text-charcoal-3/85"}`}
                  >
                    <div className="flex items-center justify-start gap-x-2">
                      <div className="aspect-square w-[22px] relative overflow-hidden">
                        <Image
                          src={"/logo/payu.webp"}
                          alt={paymentMethod === "pay-u" ? "PayU" : "Razorpay"}
                          decoding="async"
                          draggable={false}
                          width={18}
                          height={18}
                          className="w-full h-full object-cover object-center scale-105"
                          unoptimized={!OPTIMIZE_IMAGE}
                        />
                      </div>
                      <span>PayU</span>
                    </div>
                    <div
                      className={`relative justify-self-end aspect-square rounded-full ${paymentMethod === "pay-u" ? "bg-blue-500 ring-2 ring-offset-2 ring-blue-500" : "bg-charcoal-3/50"} w-3`}
                    />
                  </div>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>

          {/* right side ------------------------- */}
          <div
            className={`row-start-2 relative group flex items-center sm:justify-center p-2.5 px-3 mr-3 sm:py-3 col-span-3 ${isCheckoutComplete.status ? "bg-sienna justify-between" : "bg-charcoal-3/70 h-[58.5px] justify-center"} sm:bg-charcoal-2 overflow-hidden text-white rounded-lg sm:rounded-xl cursor-pointer`}
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
                  : () => openCheckout()
                : (e) => {
                    e.preventDefault();
                    onChangeShowAuth(true);
                  }
            }
          >
            {isCheckoutComplete.status && (
              <div className="flex flex-col items-start sm:hidden">
                <span className="-mb-0.5">
                  {INRSymbol} {summary.payableAmount}
                </span>
                <span className="text-sienna-3/80 text-[11px]">TOTAL</span>
              </div>
            )}
            <div className="flex items-center justify-end gap-1 sm:gap-2 sm:text-xl transition-all duration-200 sm:group-hover:gap-3">
              <span>
                {isCheckoutComplete.status ? "Pay Amount" : "Complete Checkout"}
              </span>
              <ArrowRight
                strokeWidth={2}
                height={16}
                width={16}
                className="sm:hidden"
              />
              <ArrowRight
                strokeWidth={2.5}
                height={17}
                width={17}
                className="max-sm:hidden translate-y-[1px]"
              />
            </div>

            {isCheckoutComplete.status && (
              <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-sienna-3/60 opacity-60 rotate-12 blur-md z-30 top-0 animate-shine-infinite-slow" />
            )}
          </div>
        </>
      ) : (
        <div
          onClick={showLogin}
          className="col-span-5 rounded-xl text-lg bg-charcoal-3/80 mt-1.5 p-3 px-3 text-white flex items-center justify-center gap-2"
        >
          <span>Login to Proceed</span>
          <ArrowRight
            strokeWidth={1.5}
            width={20}
          />
        </div>
      )}
    </div>
  );
}
