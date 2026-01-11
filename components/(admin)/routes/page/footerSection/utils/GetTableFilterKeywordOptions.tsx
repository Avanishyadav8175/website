// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectFooterSection } from "@/store/features/pages/footerSectionSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<FooterSectionDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectFooterSection.documentList);

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
