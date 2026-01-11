// icons
import { Check, MapPin } from "lucide-react";

// constants
import { IS_MOBILE, IS_TABLET } from "@/common/constants/mediaQueries";

// hooks
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartCheckoutDialog from "./components/CartCheckoutDialog";
import CartCheckoutContactPreview from "./components/CartCheckoutContactPreview";
import CartCheckoutLocationPreview from "./components/CartCheckoutLocationPreview";

export default function CartCheckout({
  showCheckoutDetail,
  onChangeShowCheckoutDetail
}: {
  showCheckoutDetail: boolean;
  onChangeShowCheckoutDetail: (showCheckoutDetail: boolean) => void;
}) {
  // hooks
  const isTablet = useMediaQuery(IS_TABLET);
  const {
    auth: {
      data: { isAuthenticated },
      method: { onChangeShowAuth }
    }
  } = useAppStates();
  const { checkout } = useCart();

  // states
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const timer = setInterval(
      () => setDirection((prev) => (prev === "down" ? "up" : "down")),
      4000
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {isTablet ? (
        isAuthenticated ? (
          <div
            className="row-start-5 grid grid-cols-1 gap-x-3.5 items-center p-2.5 cursor-pointer bg-ivory-1 z-40"
            onClick={() => {
              onChangeShowCheckoutDetail(true);
            }}
          >
            {/* <div className="aspect-square relative grid place-items-center border border-charcoal-3/20 rounded-lg p-2">
              <MapPin
                strokeWidth={1.5}
                width={18}
                height={18}
              />
              {checkout ? (
                <div className="bg-green-500 rounded-full flex items-center justify-center p-0.5 text-white absolute -right-1.5 -top-1.5">
                  <Check
                    strokeWidth={1.5}
                    width={12}
                    height={12}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col justify-start text-sm text-charcoal-3/90">
              <div
                className={`text-base line-clamp-1 ${checkout ? "" : "text-red-500"}`}
              >
                {checkout
                  ? `${checkout.location.address}, ${checkout.location.pincode}, ${checkout.location.city}`
                  : "Address is Required"}
              </div>
              <div
                className={`text-charcoal-3/70 line-clamp-1 ${checkout ? "" : "text-red-400"}`}
              >
                {checkout
                  ? `${checkout.name} • ${checkout.contact.mobileNumber.split("-")[1] ? `${checkout.contact.mobileNumber.split("-")[1]}` : checkout.contact.mobileNumber}`
                  : "Complete Checkout"}
              </div>
            </div> */}
            {checkout ? (
              <div className="whitespace-nowrap font-semibold tracking-wide text-center bg-green-900/70 text-white p-4 rounded-xl">
                Checkout Completed
              </div>
            ) : (
              <div className="whitespace-nowrap font-semibold tracking-wide text-center bg-charcoal-3/40 text-white p-4 rounded-xl">
                Complete Checkout
              </div>
            )}

          </div>
        ) : (
          <></>
        )
      ) : (
        <>
          {/* <div
          className={
            "px-3 min-[1350px]:px-0 max-lg:hidden lg:!pl-7 lg:border-l border-charcoal-3/20 max-md:pt-3 pb-3 lg:!py-4 h-fit"
          }>
          <div
            onClick={() => {
              !isAuthenticated
                ? onChangeShowAuth(true)
                : onChangeShowCheckoutDetail(true);
              // onChangeShowCheckoutDetail(true);
            }}
            className={`relative border border-charcoal-3/20 bg-ivory-1 rounded-2xl px-5 z-50 lg:row-start-2 lg:col-start-1 cursor-pointer grid grid-rows-[50px_50px] lg:grid-rows-[74px_74px] overflow-hidden lg:h-[74px] transition-all duration-300 ${isAuthenticated ? "hover:border-charcoal-3/50" : ""}`}
          >
            <CartCheckoutLocationPreview direction={direction} />
            <CartCheckoutContactPreview direction={direction} />
            {!isAuthenticated && (
              <div className="absolute w-full h-full bg-ash/30 text-charcoal-3 flex items-center justify-center backdrop-blur-[2px]">
                <span className="font-medium text-lg">Login first</span>
              </div>
            )}
          </div>
        </div> */}

          <div
            className={
              "px-3 min-[1350px]:px-0 max-lg:hidden lg:!pl-7 lg:border-l border-charcoal-3/20 max-md:pt-3 pb-3 lg:!py-4 h-fit"
            }>
            <div
              onClick={() => {
                !isAuthenticated
                  ? onChangeShowAuth(true)
                  : onChangeShowCheckoutDetail(true);
                // onChangeShowCheckoutDetail(true);
              }}
              className={`relative border border-charcoal-3/20 bg-ivory-1 rounded-2xl px-5 z-50 lg:row-start-2 lg:col-start-1 cursor-pointer grid grid-rows-[50px_50px] lg:grid-rows-[74px_74px] overflow-hidden lg:h-[74px] transition-all duration-300 ${isAuthenticated ? "hover:border-charcoal-3/50" : ""}`}
            >
              <CartCheckoutLocationPreview direction={direction} />
              <CartCheckoutContactPreview direction={direction} />
              {!isAuthenticated && (
                <div className="absolute w-full h-full bg-ash/30 text-charcoal-3 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="font-medium text-lg">Login first</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <CartCheckoutDialog
        showDialog={showCheckoutDetail}
        onChangeShowDialog={onChangeShowCheckoutDetail}
      />
    </>
  );
}
