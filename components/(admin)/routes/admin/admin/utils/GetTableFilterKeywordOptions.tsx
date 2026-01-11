// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectAdmin } from "@/store/features/users/adminSlice";

// types
import { type AdminDocument } from "@/common/types/documentation/users/admin";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<AdminDocument>) => void;
}) {
  const { documents } = useSelector(selectAdmin.documentList);

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
