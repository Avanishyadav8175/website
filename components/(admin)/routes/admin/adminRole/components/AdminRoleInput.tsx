import { AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";
import { allAdminRolePermission } from "../constants/permission";
import AdminRoleSection from "./AdminRoleSection";

export default function AdminRoleInput({
  adminRolePermission,
  onChangeAdminRolePermission
}: {
  adminRolePermission: AdminRolePermissionDocument;
  onChangeAdminRolePermission: (
    newAdminRolePermission: AdminRolePermissionDocument
  ) => void;
}) {
  return (
    <div className="w-full relative space-y-2">
      <div
        className={`pt-4 pb-3 sticky top-0 bg-white grid grid-cols-[60px_1fr_60px_60px_60px_60px] overflow-y-hidden overflow-hidden text-xs justify-center text-center font-bold`}
      >
        <span></span>
        <span></span>
        <span>CREATE</span>
        <span>READ</span>
        <span>UPDATE</span>
        <span>DELETE</span>
      </div>
      {Object.keys(allAdminRolePermission).map((key, i) => (
        <AdminRoleSection
          key={i}
          sectionKey={key}
          initialSectionPermission={
            allAdminRolePermission[key as keyof AdminRolePermissionDocument]
          }
          sectionPermission={
            adminRolePermission[key as keyof AdminRolePermissionDocument]
              ? adminRolePermission[key as keyof AdminRolePermissionDocument]
              : allAdminRolePermission[key as keyof AdminRolePermissionDocument]
          }
          onChangeSectionPermission={({ isCustomized, all, custom }) => {
            const newAdminRolePermission = {
              ...adminRolePermission
            } as AdminRolePermissionDocument;

            if (
              !isCustomized &&
              !all.create &&
              !all.read &&
              !all.update &&
              !all.delete
            ) {
              delete newAdminRolePermission[
                key as keyof AdminRolePermissionDocument
              ];
            } else if (!isCustomized) {
              newAdminRolePermission[key as keyof AdminRolePermissionDocument] =
                {
                  isCustomized: false,
                  all: all
                };
            } else {
              newAdminRolePermission[key as keyof AdminRolePermissionDocument] =
                {
                  isCustomized: true,
                  custom: custom
                };
            }

            onChangeAdminRolePermission(newAdminRolePermission);
          }}
        />
      ))}
    </div>
  );
}
