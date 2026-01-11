"use client";

// hooks
import { useState } from "react";

// redux
import {
  createPaymentCycleAction,
  selectPaymentCycle
} from "@/store/features/presets/paymentCycleSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PaymentCycleDocument } from "@/common/types/documentation/presets/paymentCycle";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function PaymentCycleTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<PaymentCycleDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Payment Cycles"
        documentName="Payment Cycle"
        createAction={createPaymentCycleAction}
        select={selectPaymentCycle}
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
