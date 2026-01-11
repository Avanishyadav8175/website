"use client";

// hooks
import { useState } from "react";

// redux
import {
  createBrandAction,
  selectBrand
} from "@/store/features/presets/brandSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type BrandDocument } from "@/common/types/documentation/presets/brand";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function BrandTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<BrandDocument>
  >({});

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Brands"
        documentName="Brand"
        createAction={createBrandAction}
        select={selectBrand}
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
