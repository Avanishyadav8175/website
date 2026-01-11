// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectSecurityQuestion } from "@/store/features/presets/securityQuestionSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type SecurityQuestionDocument } from "@/common/types/documentation/presets/securityQuestion";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<SecurityQuestionDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectSecurityQuestion.documentList);

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
