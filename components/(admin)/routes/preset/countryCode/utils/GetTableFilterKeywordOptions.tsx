// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAdvancePayment } from "@/store/features/presets/advancePaymentSlice";

// types
import { type CountryCodeDocument } from "@/common/types/documentation/presets/countryCode";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CountryCodeDocument>) => void;
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
