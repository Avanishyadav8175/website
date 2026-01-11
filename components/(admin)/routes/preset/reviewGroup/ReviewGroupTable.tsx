"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createReviewGroupAction,
  selectReviewGroup
} from "@/store/features/presets/reviewGroupSlice";
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";

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
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";
import { allPermissions } from "@/common/constants/values";

export default function ReviewGroupTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const dispatch = useDispatch();

  const contentCategoryStatus = useSelector(selectContentCategory.status);

  const { documents: contentCategories } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true
    })
  );

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<ReviewGroupDocument>
  >({});

  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocumentList());
    }
  }, [contentCategoryStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Reviews"
        documentName="Review"
        createAction={createReviewGroupAction}
        select={selectReviewGroup}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission: allPermissions,
          contentCategories
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
