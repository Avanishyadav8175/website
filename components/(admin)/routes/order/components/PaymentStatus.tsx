// hooks
import { useEffect, useState } from "react";
import { useDispatch } from "@/store/withType";

// redux
import { createOrderAction } from "@/store/features/dynamic/orderSlice";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type OrderPaymentDocument } from "@/common/types/documentation/nestedDocuments/orderPayment";
import { type PaymentStatus } from "./types/type";

export default function PaymentStatus({
  orderId,
  payment,
  status,
  isDisabled
}: {
  orderId: string;
  payment: OrderPaymentDocument;
  status: PaymentStatus;
  isDisabled: boolean;
}) {
  // hooks
  const dispatch = useDispatch();

  // status
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(status);

  // side effects
  useEffect(() => {
    setPaymentStatus(status);
  }, [status, orderId]);

  return (
    <Input
      className="min-w-[150px]"
      type="dropdown"
      name="status"
      isRequired={false}
      isDisabled={isDisabled}
      errorCheck={false}
      validCheck={false}
      nullOption={false}
      options={[
        { label: "Failed", value: "pending" },
        { label: "Success", value: "completed" }
      ]}
      customValue={{
        value: paymentStatus,
        setValue: (newStatus) => {
          dispatch(
            createOrderAction.updateDocument({
              documentId: orderId,
              updateData: {
                payment: {
                  ...payment,
                  status: newStatus as PaymentStatus
                } as OrderPaymentDocument
              }
            })
          );

          setPaymentStatus(newStatus as PaymentStatus);
        }
      }}
    />
  );
}
