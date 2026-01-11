"use client";

// hooks
import { useState } from "react";

// redux
import {
  createCommissionAction,
  selectCommission
} from "@/store/features/presets/commissionSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types=
import { type CommissionDocument } from "@/common/types/documentation/presets/commission";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function CommissionTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<CommissionDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Commissions"
        documentName="Commission"
        createAction={createCommissionAction}
        select={selectCommission}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
