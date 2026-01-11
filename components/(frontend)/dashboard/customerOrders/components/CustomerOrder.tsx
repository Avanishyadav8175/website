// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries
import moment from "moment";

// icons
import { Download, Eye, List } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// hooks
import { useState } from "react";
import { usePayment } from "@/hooks/usePayment/usePayment";

// providers
import { SettingProvider } from "@/hooks/useSetting/useSetting";

// components
import CustomerOrderItem from "./CustomerOrderItem";
import CustomerOrderRetryPayment from "./CustomerOrderRetryPayment";
import Image from "next/image";
import OrderDetailsPopup from "./OrderDetailsPopup";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

export default function CustomerOrder({ order }: { order: OrderDocument }) {
  // props
  const { _id, id, payment, cart: orderCart, createdAt } = order;

  // hooks
  const { onInitiateRetryPayment } = usePayment();

  // states
  const [open, setOpen] = useState<boolean>(false);

  // variables
  const cart = orderCart as CartDocument;

  return (
    <section className="relative overflow-hidden grid grid-cols-1  gap-1.5 *:pr-3 *:pl-4 py-3 rounded-2xl bg-ivory-1 border border-charcoal-3/10 shadow-md">
      <div
        className={`-z-0 absolute top-0 right-0 w-72 aspect-[3/1] ${payment.status === "completed" ? "bg-green-100" : "bg-rose-100"} [mask-image:radial-gradient(60%_100%_at_top_right,white,transparent)]`}
      />
      <section className="z-10">
        <section className="grid grid-cols-[4fr_1fr_120px] items-start justify-start">
          <section className="flex flex-col justify-center items-start">
            <span className="text-charcoal-3 text-lg font-medium">
              Order ID: {id}
            </span>
            <span className="font-medium text-charcoal-3 text-[17px] flex items-center justify-start gap-x-1.5">
              <span>
                Total Amount: {INRSymbol}{cart.price.total}
              </span>
              {cart.price.due > 0 && (
                <span className="text-red-500">
                  (Due: {INRSymbol}{cart.price.due})
                </span>
              )}
            </span>
            <span className="text-charcoal-3/90 text-[15px]">
              Ordered On: {moment(createdAt).format("DD MMM YYYY, hh:mm A")}
            </span>
            {/* {payment.status === "pending" && (
              <span className="text-red-500 text-[12px]">
                {"* complete payment to avoid auto cancellation"}
              </span>
            )} */}
          </section>
          <section className="flex flex-col max-sm:hidden items-center justify-start gap-4 pt-1 pr-6">
            <div
              onClick={() => {
                setOpen((prev) => true);
              }}
              className="flex items-center justify-start gap-1.5 text-sm w-fit px-4 py-1 rounded-full transition-all duration-300 cursor-pointer bg-charcoal-3/10 hover:bg-charcoal-3/20 text-charcoal-3"
            >
              <List
                strokeWidth={2}
                width={14}
                height={14}
              />
              <span className="truncate">More Details</span>
            </div>
            {/* {payment.status === "completed" && (
              <div className="flex items-center justify-start gap-1.5 text-sm w-fit px-4 py-1 rounded-full transition-all duration-300 cursor-pointer bg-charcoal-3/10 hover:bg-charcoal-3/20 text-charcoal-3">
                <Download
                  strokeWidth={2}
                  width={14}
                  height={14}
                />
                <span>Download</span>
              </div>
            )} */}
            {payment.status === "pending" && (
              <SettingProvider>
                <CustomerOrderRetryPayment
                  orderId={_id as string}
                  cartId={(orderCart as CartDocument)._id as string}
                  amount={payment.amount}
                  percentage={payment.percentage}
                />
              </SettingProvider>
            )}
          </section>
          <div className="overflow-hidden relative font-semibold text-sm uppercase max-sm:col-span-2 text-right pt-1.5">
            {payment.status === "completed" ? (
              <span className="text-green-600">Complete</span>
            ) : (
              <span className="text-red-600">Failed</span>
            )}
          </div>
        </section>
      </section>

      <section className="flex sm:hidden items-center justify-start gap-4 pt-2">
        <div
          onClick={() => {
            setOpen((prev) => true);
          }}
          className="flex items-center justify-start gap-1.5 text-sm w-fit px-4 py-1 rounded-full transition-all duration-300 cursor-pointer bg-charcoal-3/10 hover:bg-charcoal-3/20 text-charcoal-3"
        >
          <List
            strokeWidth={2}
            width={14}
            height={14}
          />
          <span>More Details</span>
        </div>
        {/* {payment.status === "completed" && (
              <div className="flex items-center justify-start gap-1.5 text-sm w-fit px-4 py-1 rounded-full transition-all duration-300 cursor-pointer bg-charcoal-3/10 hover:bg-charcoal-3/20 text-charcoal-3">
                <Download
                  strokeWidth={2}
                  width={14}
                  height={14}
                />
                <span>Download</span>
              </div>
            )} */}
        {payment.status === "pending" && (
          <SettingProvider>
            <CustomerOrderRetryPayment
              orderId={_id as string}
              cartId={(orderCart as CartDocument)._id as string}
              amount={payment.amount}
              percentage={payment.percentage}
            />
          </SettingProvider>
        )}
      </section>


      <section className="border-t mt-2 pt-3 flex items-center justify-start overflow-auto scrollbar-hide gap-2 w-full">
        {(cart as CartDocument).items.map((item, i) => (
          <CustomerOrderItem
            key={item._id as string}
            item={item}
          />
        ))}
      </section>

      <OrderDetailsPopup
        open={open}
        setOpen={setOpen}
        order={order}
        retryPayment={() => {
          onInitiateRetryPayment({
            gateway: "razorpay",
            cartId: (orderCart as CartDocument)._id as string,
            orderId: _id as string,
            amount: payment.amount,
            percentage: payment.percentage
          });
        }}
        downloadInvoice={() => { }}
      />
    </section>
  );
}
