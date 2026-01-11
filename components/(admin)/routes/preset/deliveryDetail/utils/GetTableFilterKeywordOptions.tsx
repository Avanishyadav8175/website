// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectDeliveryDetail } from "@/store/features/presets/deliveryDetailSlice";

// types
import { type DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<DeliveryDetailDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectDeliveryDetail.documentList);

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
