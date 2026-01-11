// types
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";

// permission
export const superAdminPermission = {
  create: true,
  read: true,
  update: true,
  delete: true
};

export const getPermission = ({
  isSuperAdmin,
  permission,
  sectionKey,
  subSectionKey
}: {
  isSuperAdmin?: boolean;
  permission?: AdminRolePermissionDocument;
  sectionKey: string;
  subSectionKey?: string;
}) =>
  subSectionKey
    ? isSuperAdmin
      ? superAdminPermission
      : permission
        ? permission[sectionKey as keyof AdminRolePermissionDocument][
            "isCustomized"
          ]
          ? permission[sectionKey as keyof AdminRolePermissionDocument][
              "custom"
            ][subSectionKey]
          : permission[sectionKey as keyof AdminRolePermissionDocument]["all"]
        : undefined
    : isSuperAdmin
      ? superAdminPermission
      : permission
        ? permission[sectionKey as keyof AdminRolePermissionDocument]["all"]
        : undefined;
