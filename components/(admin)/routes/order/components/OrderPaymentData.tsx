// types
import { type OrderPaymentDocument } from "@/common/types/documentation/nestedDocuments/orderPayment";

export default function OrderPaymentData({
  payment
}: {
  payment: OrderPaymentDocument;
}) {
  return (
    <section className="flex flex-col">
      <span className="text-lg font-semibold underline">Payment Details</span>
      <section className="flex flex-col">
        <span className="flex items-baseline gap-1">
          <span className="text-sm font-medium">{"Gateway:"}</span>
          <span>{payment?.gateway?.name || ""}</span>
        </span>
        {payment?.gateway?.info &&
          Object.keys(payment?.gateway?.info).map((key, i) => (
            <span
              key={i}
              className="flex items-baseline gap-1"
            >
              <span className="text-sm font-medium capitalize">{`${key.split("_").join(" ")}:`}</span>
              <span>
                {String((payment.gateway.info as Record<string, any>)[key])}
              </span>
            </span>
          ))}
      </section>
    </section>
  );
}
