// icons
import { ChevronDown, PenLine, Truck } from "lucide-react";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function CartCheckoutLocationPreview({
  direction
}: {
  direction: "up" | "down";
}) {
  // hooks
  const {
    auth: {
      data: { isAuthenticated }
    },
    cart: {
      data: { cart }
    }
  } = useAppStates();

  return (
    <div
      className={`py-3.5 grid grid-cols-[auto_1fr_auto] gap-x-3 transition-all duration-500 ${direction === "down" ? "translate-y-[-74px]" : "translate-y-0"}`}
    >
      <span>
        <Truck
          strokeWidth={1.5}
          width={18}
          height={18}
        />
      </span>
      <div className="flex flex-col justify-start items-start truncate">
        <span className="text-sm font-medium text-charcoal-3/90">
          Delivery at:
        </span>
        {cart?.checkout?.location?.address &&
        cart?.checkout?.location?.pincode &&
        cart?.checkout?.location?.city ? (
          <span className="flex items-center justify-start gap-1.5">
            {`${cart?.checkout?.location?.address}, ${cart?.checkout?.location?.pincode}, ${cart?.checkout?.location?.city}` ||
              "Enter Address"}
            <span>
              <PenLine
                width={17}
                height={17}
              />
            </span>
          </span>
        ) : (
          <span className="text-red-500/70 font-medium flex items-center justify-start gap-1.5">
            <span>{"Address Is Required "}</span>
            {isAuthenticated ? (
              <span>
                <PenLine
                  width={17}
                  height={17}
                />
              </span>
            ) : (
              <span className="text-red-600/90 underline underline-offset-2 flex items-center justify-start gap-1">
                <span>Login</span>
                <span>
                  <PenLine
                    width={17}
                    height={17}
                  />
                </span>
              </span>
            )}
          </span>
        )}
      </div>
      <span className="self-center">
        <ChevronDown
          strokeWidth={1.5}
          width={20}
          height={20}
        />
      </span>
    </div>
  );
}
