// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectRelation } from "@/store/features/presets/relationSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<RelationDocument>) => void;
}) {
  const { documents } = useSelector(selectRelation.documentList);

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
