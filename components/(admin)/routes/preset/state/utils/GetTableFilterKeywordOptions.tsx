// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectState } from "@/store/features/presets/stateSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type StateDocument } from "@/common/types/documentation/presets/state";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<StateDocument>) => void;
}) {
  const { documents } = useSelector(selectState.documentList);

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
