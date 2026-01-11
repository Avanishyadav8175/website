// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectVenue } from "@/store/features/presets/venueSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type VenueDocument } from "@/common/types/documentation/presets/venue";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<VenueDocument>) => void;
}) {
  const { documents } = useSelector(selectVenue.documentList);

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
