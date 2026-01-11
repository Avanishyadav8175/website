"use client";

// providers
import { PaymentProvider } from "@/hooks/usePayment/usePayment";

// components
import CartWithHook from "./CartWithHook";
import ContextProvider from "@/components/(frontend)/ContextProvider";

export default function Cart() {
  return (
    <ContextProvider>
      <PaymentProvider>
        <CartWithHook />
      </PaymentProvider>
    </ContextProvider>
  );
}
