// icons
import { ArrowRight } from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSetting } from "@/hooks/useSetting/useSetting";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { usePayment } from "@/hooks/usePayment/usePayment";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartPaymentGateway from "./CartPaymentGateway";

export default function CartPaymentButton({
  onChangeShowCheckoutDetail
}: {
  onChangeShowCheckoutDetail: (showCheckoutDetail: boolean) => void;
}) {
  // hooks
  const { toast } = useToast();
  const { payment } = useSetting();
  const {
    auth: {
      data: { isAuthenticated },
      method: { onChangeShowAuth }
    },
    cart: {
      data: { cart }
    },
    profile: {
      data: { cartId }
    }
  } = useAppStates();
  const { onInitiateNewPayment } = usePayment();
  const { onCreateCart } = useCart();

  // states
  const [gateway, setGateway] = useState<"razorpay" | "payu">("razorpay");

  // variables
  const defaultGateway = payment?.default || "razorpay";
  const showSelectGateway = payment?.active?.razorpay && payment?.active?.payu;

  const isCheckoutComplete = Boolean(
    cart?.checkout?.location?.address &&
      cart?.checkout?.location?.city &&
      cart?.checkout?.location?.pincode
  );

  // side effects
  useEffect(() => {
    setGateway(defaultGateway);
  }, [defaultGateway]);

  return (
    <div
      className={
        "px-3 max-lg:pb-2 min-[1350px]:px-0 lg:!pl-7 lg:border-l border-charcoal-3/20 max-lg:z-40 flex flex-col justify-center max-lg:!px-2.5"
      }
    >
      {isAuthenticated && showSelectGateway && (
        <CartPaymentGateway
          gateway={gateway}
          onChangeGateway={setGateway}
        />
      )}
      <div
        onClick={
          isAuthenticated
            ? cart?.checkout && isCheckoutComplete
              ? cartId
                ? () => {
                    onInitiateNewPayment({
                      gateway,
                      cartId,
                      amount: cart.price.payable,
                      percentage: cart.price.paymentPercentage
                    });
                  }
                : () => {
                    onCreateCart();

                    toast({
                      title: "Something Went Wrong",
                      description: "Please try again.",
                      variant: "warning"
                    });
                  }
              : () => {
                  onChangeShowCheckoutDetail(true);
                }
            : () => {
                onChangeShowAuth(true);
              }
        }
        className={`z-10 group relative flex items-center justify-center cursor-pointer rounded-xl text-lg ${isAuthenticated ? (cart?.checkout && isCheckoutComplete ? "bg-green-600 brightness-110" : "bg-[#727272] opacity-85") : "bg-sienna-2/90 hover:bg-sienna-2"} text-white py-3.5 px-3.5 transition-all duration-300`}
      >
        <span className="translate-x-0 font-medium transition-all duration-200">
          {isAuthenticated
            ? cart?.checkout && isCheckoutComplete
              ? "Pay Amount"
              : "User Details Incomplete"
            : "User Login"}
        </span>
        {/* <ArrowRight
          strokeWidth={1.5}
          width={21}
          className="opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
        /> */}
      </div>
    </div>
  );
}
