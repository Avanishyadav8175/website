// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectCommission } from "@/store/features/presets/commissionSlice";

// types
import { type CommissionDocument } from "@/common/types/documentation/presets/commission";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CommissionDocument>) => void;
}) {
  const { documents } = useSelector(selectCommission.documentList);

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
