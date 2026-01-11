// providers
import { CartProvider } from "@/hooks/useOptimizedCart/useCart";
import { CustomerProfileProvider } from "@/hooks/useCustomerProfile";
import { PaymentProvider } from "@/hooks/usePayment/usePayment";

// components
import CartHeader from "@/components/(frontend)/components/header/cart/CartHeader";
import MadeWithLoveInIndia from "@/components/(_common)/utils/MadeWithLoveInIndia";

// types
import { type Children } from "@/common/types/reactTypes";

export default function FrontendTransactionRoot({
  children
}: {
  children: Children;
}) {
  return (
    <CustomerProfileProvider>
      <CartProvider>
        <PaymentProvider>
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_390px] lg:grid-rows-[repeat(8,auto)] lg:gap-x-8 lg:max-w-1200 lg:left-1/2 lg:-translate-x-1/2 sm:px-20 lg:px-0">
            <CartHeader />
            {children}
          </div>
          {/* <MadeWithLoveInIndia hide /> */}
        </PaymentProvider>
      </CartProvider>
    </CustomerProfileProvider>
  );
}
