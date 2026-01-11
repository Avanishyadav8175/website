// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectFlavour } from "@/store/features/presets/flavourSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<FlavourDocument>) => void;
}) {
  const { documents } = useSelector(selectFlavour.documentList);

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
