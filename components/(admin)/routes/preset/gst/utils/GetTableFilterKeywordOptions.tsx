// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectGST } from "@/store/features/presets/gstSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type GSTDocument } from "@/common/types/documentation/presets/gst";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<GSTDocument>) => void;
}) {
  const { documents } = useSelector(selectGST.documentList);

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
