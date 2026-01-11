// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAdminRole } from "@/store/features/presets/adminRoleSlice";

// types
import { type AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<AdminRoleDocument>) => void;
}) {
  const { documents } = useSelector(selectAdminRole.documentList);

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
