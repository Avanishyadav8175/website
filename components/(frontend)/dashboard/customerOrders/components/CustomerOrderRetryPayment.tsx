// icons
import { RotateCcw } from "lucide-react";

// hooks
import { useSetting } from "@/hooks/useSetting/useSetting";
import { usePayment } from "@/hooks/usePayment/usePayment";

export default function CustomerOrderRetryPayment({
  orderId,
  cartId,
  amount,
  percentage
}: {
  orderId: string;
  cartId: string;
  amount: number;
  percentage: number;
}) {
  // hooks
  const { payment } = useSetting();
  const { onInitiateRetryPayment } = usePayment();

  // variables
  const gateway = payment?.default || "razorpay";

  return (
    <div
      className="flex items-center justify-start gap-1.5 text-sm text-blue-600 cursor-pointer w-fit px-4 py-1 rounded-full transition-all duration-300 bg-blue-100/80 hover:bg-blue-500 hover:text-white group"
      onClick={() => {
        onInitiateRetryPayment({
          gateway,
          orderId,
          cartId,
          amount,
          percentage
        });
      }}
    >
      <RotateCcw
        strokeWidth={2}
        width={14}
        height={14}
      />
      <span className="whitespace-nowrap">Retry Payment</span>
    </div>
  );
}
