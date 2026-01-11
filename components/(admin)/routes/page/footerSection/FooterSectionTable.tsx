"use client";

// hooks
import { useState } from "react";

// redux
import {
  createFooterSectionAction,
  selectFooterSection
} from "@/store/features/pages/footerSectionSlice";

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
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function FooterSectionTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<FooterSectionDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Footer Sections"
        documentName="Footer Section"
        createAction={createFooterSectionAction}
        select={selectFooterSection}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
