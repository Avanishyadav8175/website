"use client";

// hooks
import { useState } from "react";

// redux
import {
  createAdminRoleAction,
  selectAdminRole
} from "@/store/features/presets/adminRoleSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function AdminRoleTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<AdminRoleDocument>
  >({});

  const [adminRolePermission, setAdminRolePermission] =
    useState<AdminRolePermissionDocument>({} as AdminRolePermissionDocument);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Admin Roles"
        documentName="Admin Role"
        createAction={createAdminRoleAction}
        select={selectAdminRole}
        filterKeywordOptions={filterKeywordOptions}
        dialogClassName="sm:min-w-[600px] overflow-y-scroll scrollbar-hide sm:max-h-[95dvh] pt-0"
        getContent={getTableContentGenerator({ permission })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields
            initialDocument={initialDocument}
            adminRolePermission={adminRolePermission}
            onChangeAdminRolePermission={setAdminRolePermission}
          />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator({
          adminRolePermission
        })}
      />
    </>
  );
}
