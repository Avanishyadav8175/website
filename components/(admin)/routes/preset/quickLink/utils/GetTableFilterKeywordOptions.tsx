// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectQuickLink } from "@/store/features/presets/quickLinkSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<QuickLinkDocument>) => void;
}) {
  const { documents } = useSelector(selectQuickLink.documentList);

  useEffect(() => {
    onReturnOptions({
      image: [
        {
          label: "Has Image",
          value: "true"
        },
        {
          label: "Don't has Image",
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
