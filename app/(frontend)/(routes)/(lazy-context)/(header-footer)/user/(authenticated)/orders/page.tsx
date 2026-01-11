// providers
import { PaymentProvider } from "@/hooks/usePayment/usePayment";

// components
import CustomerOrders from "@/components/(frontend)/dashboard/customerOrders/CustomerOrders";

export default async function CustomerOrdersPage() {
  // return <></>;
  return (
    <PaymentProvider>
      <CustomerOrders />
    </PaymentProvider>
  );
}
