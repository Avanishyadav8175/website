// icons
import { PayUSVG, RazorpaySVG } from "@/common/svgs/svg";

// types
import { type PaymentGatewayData } from "../types/types";

export const PAYMENT_GATEWAYS_DATA: PaymentGatewayData[] = [
  {
    name: "razorpay",
    label: "Razorpay",
    icon: (
      <RazorpaySVG
        strokeWidth={2}
        width={140}
        height={40}
      />
    )
  },
  {
    name: "payu",
    label: "PayU",
    icon: (
      <PayUSVG
        width={140}
        height={40}
      />
    )
  }
];
