"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAITagCategoryAction,
  selectAITagCategory
} from "@/store/features/categories/aiTagCategorySlice";
import {
  createAITagAction,
  selectAITag
} from "@/store/features/presets/aiTagSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function AITagTable({
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

  // redux
  const aiTagCategoryStatus = useSelector(selectAITagCategory.status);

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<AITagDocument>
  >({});

  // effects
  useEffect(() => {
    if (aiTagCategoryStatus === "idle") {
      dispatch(createAITagCategoryAction.fetchDocumentList());
    }
  }, [aiTagCategoryStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="AI Tags"
        documentName="AI Tag"
        createAction={createAITagAction}
        select={selectAITag}
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
