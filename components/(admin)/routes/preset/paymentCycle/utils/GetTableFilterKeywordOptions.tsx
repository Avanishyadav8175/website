// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectPaymentCycle } from "@/store/features/presets/paymentCycleSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PaymentCycleDocument } from "@/common/types/documentation/presets/paymentCycle";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<PaymentCycleDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectPaymentCycle.documentList);

  useEffect(() => {
    onReturnOptions({
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, onReturnOptions]);

  return null;
}
