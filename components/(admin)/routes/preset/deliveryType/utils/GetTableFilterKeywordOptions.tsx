// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectBrand } from "@/store/features/presets/brandSlice";

// types
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<DeliveryTypeDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectBrand.documentList);

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
