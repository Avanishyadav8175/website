// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectCareInfo } from "@/store/features/presets/careInfoSlice";

// types
import { type CareInfoDocument } from "@/common/types/documentation/presets/careInfo";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CareInfoDocument>) => void;
}) {
  const { documents } = useSelector(selectCareInfo.documentList);

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
