// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectProcessingTime } from "@/store/features/presets/processingTimeSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<ProcessingTimeDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectProcessingTime.documentList);

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
