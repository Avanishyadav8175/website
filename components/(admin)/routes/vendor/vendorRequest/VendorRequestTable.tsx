"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createVendorRequestAction,
  selectVendorRequest
} from "@/store/features/actions/vendorRequestSlice";
import {
  createFoundUsSourceAction,
  selectFoundUsSource
} from "@/store/features/presets/foundUsSourceSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type AITagCategoryDocument } from "@/common/types/documentation/categories/aiTagCategory";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function VendorRequestTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const foundUsSourceStatus = useSelector(selectFoundUsSource.status);

  const { documents: foundUsSources } = useSelector((state) =>
    selectFoundUsSource.documentList(state, {
      active: true,
      sortBy: "source",
      orderBy: "asc"
    })
  );

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<AITagCategoryDocument>
  >({});

  // side effects
  useEffect(() => {
    if (foundUsSourceStatus === "idle") {
      dispatch(createFoundUsSourceAction.fetchDocumentList());
    }
  }, [foundUsSourceStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Contact Us Form"
        documentName="Contact Us Form"
        createAction={createVendorRequestAction}
        select={selectVendorRequest}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          userName,
          permission: allPermissions,
          foundUsSources
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
