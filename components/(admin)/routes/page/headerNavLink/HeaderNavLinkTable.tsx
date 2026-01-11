"use client";

// hooks
import { useState } from "react";

// redux
import {
  createHeaderNavLinkAction,
  selectHeaderNavLink
} from "@/store/features/pages/headerNavLinkSlice";

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
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function HeaderNavLinkTable({
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
    FilterKeywordOptions<HeaderNavLinkDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Header Nav Links"
        documentName="Header Nav Link"
        createAction={createHeaderNavLinkAction}
        select={selectHeaderNavLink}
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
