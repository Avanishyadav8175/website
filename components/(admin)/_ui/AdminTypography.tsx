// types
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export const AdminPanelHeading = ({
  title,
  color,
  permission
}: {
  title: string;
  color?: string;
  permission?: PermissionDocument;
}) => {
  return (
    <div className="text-3xl sm:text-xl pb-3 max-1200:px-3.5">{title}</div>
  );
};
