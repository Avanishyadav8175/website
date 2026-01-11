// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectUnit } from "@/store/features/presets/unitSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<UnitDocument>) => void;
}) {
  const { documents } = useSelector(selectUnit.documentList);

  useEffect(() => {
    onReturnOptions({
      serves: [
        {
          label: "Has Info",
          value: "true"
        },
        {
          label: "Don't has Info",
          value: "false"
        }
      ],
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
