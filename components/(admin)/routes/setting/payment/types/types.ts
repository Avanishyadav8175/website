import { type ReactNode } from "react";

export type PaymentGateway = "razorpay" | "payu";
export type PaymentGatewayData = {
  name: PaymentGateway;
  label: string;
  icon: ReactNode;
};
