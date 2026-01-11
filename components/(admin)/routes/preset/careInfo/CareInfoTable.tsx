"use client";

// hooks
import { useState } from "react";

// redux
import {
  createCareInfoAction,
  selectCareInfo
} from "@/store/features/presets/careInfoSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function CareInfoTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<CancellationPolicyDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Care Infos"
        documentName="Care Info"
        createAction={createCareInfoAction}
        select={selectCareInfo}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission: allPermissions })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
