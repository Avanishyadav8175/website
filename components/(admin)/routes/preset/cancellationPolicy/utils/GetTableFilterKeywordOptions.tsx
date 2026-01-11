// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectCancellationPolicy } from "@/store/features/presets/cancellationPolicySlice";

// types
import { type CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<CancellationPolicyDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectCancellationPolicy.documentList);

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
