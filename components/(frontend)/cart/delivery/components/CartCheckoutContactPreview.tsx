// icons
import { ChevronDown, PenLine, UserRound } from "lucide-react";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function CartCheckoutContactPreview({
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
        <UserRound
          strokeWidth={1.5}
          width={18}
          height={18}
        />
      </span>
      <div className="flex flex-col justify-start items-start truncate">
        <span className="text-sm font-medium text-charcoal-3/90">
          User Details:
        </span>
        {cart?.checkout?.name &&
        (cart?.checkout?.contact?.mobileNumber ||
          cart?.checkout?.contact?.mail) ? (
          <span className="flex items-center justify-start gap-1.5">
            <span>{`${cart.checkout.name} ${cart?.checkout?.contact?.mobileNumber ? `• ${cart.checkout.contact.mobileNumber}` : ""} ${cart?.checkout?.contact?.mail ? `• ${cart.checkout.contact.mail}` : ""}`}</span>
            <span>
              <PenLine
                width={17}
                height={17}
              />
            </span>
          </span>
        ) : (
          <span className="font-medium text-red-500/70 flex items-center justify-start gap-1.5">
            <span className="flex items-center justify-start gap-1.5">
              <span>
                {`Name ${
                  !cart?.checkout?.contact?.mobileNumber
                    ? "and Mobile"
                    : !cart?.checkout?.contact?.mail
                      ? "and Email"
                      : ""
                } is Required`}
              </span>
              {isAuthenticated && (
                <span>
                  <PenLine
                    width={17}
                    height={17}
                  />
                </span>
              )}
            </span>
            {!isAuthenticated && (
              <span className="text-red-600/90 underline underline-offset-2 flex items-center justify-start gap-1">
                <span>{"Login"}</span>
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
