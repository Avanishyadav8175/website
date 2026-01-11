// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectBalloonColorGroup } from "@/store/features/presets/balloonColorGroupSlice";

// types
import { type BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<BalloonColorGroupDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectBalloonColorGroup.documentList);

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
