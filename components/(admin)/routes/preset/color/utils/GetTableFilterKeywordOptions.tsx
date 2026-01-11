// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAdvancePayment } from "@/store/features/presets/advancePaymentSlice";

// types
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<ColorDocument>) => void;
}) {
  const { documents } = useSelector(selectAdvancePayment.documentList);

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
