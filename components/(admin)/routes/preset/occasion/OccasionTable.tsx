"use client";

// hooks
import { useState } from "react";

// redux
import {
  createOccasionAction,
  selectOccasion
} from "@/store/features/presets/occasionSlice";

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
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function OccasionTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<OccasionDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Occasions"
        documentName="Occasion"
        createAction={createOccasionAction}
        select={selectOccasion}
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
