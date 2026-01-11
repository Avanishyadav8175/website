// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectUpgrade } from "@/store/features/presets/upgradeSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<UpgradeDocument>) => void;
}) {
  const { documents } = useSelector(selectUpgrade.documentList);

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
