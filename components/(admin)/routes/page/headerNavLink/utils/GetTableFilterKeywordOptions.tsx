// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectHeaderNavLink } from "@/store/features/pages/headerNavLinkSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<HeaderNavLinkDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectHeaderNavLink.documentList);

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
