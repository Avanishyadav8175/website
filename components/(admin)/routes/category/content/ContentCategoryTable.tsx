"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";
import { createContentCategoryAction, selectContentCategory } from "@/store/features/categories/contentCategorySlice";
import { createImageAction, selectImage } from "@/store/features/media/imageSlice";
import { createAdvancePaymentAction, selectAdvancePayment } from "@/store/features/presets/advancePaymentSlice";
import { createGSTAction, selectGST } from "@/store/features/presets/gstSlice";
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";
import TableFormFields from "./components/TableFormFields";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function ContentCategoryTable({
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
  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector((state) =>
    selectImage.documentList(state, {
      deleted: false
    })
  );

  const advancePaymentStatus = useSelector(selectAdvancePayment.status);

  const gstStatus = useSelector(selectGST.status);

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<ContentCategoryDocument>
  >({});

  // side effects
  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (advancePaymentStatus === "idle") {
      dispatch(createAdvancePaymentAction.fetchDocumentList());
    }
  }, [advancePaymentStatus, dispatch]);

  useEffect(() => {
    if (gstStatus === "idle") {
      dispatch(createGSTAction.fetchDocumentList());
    }
  }, [gstStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={true}
        permission={allPermissions}
        collectionName="Categories 1"
        documentName="Product Category"
        createAction={createContentCategoryAction}
        select={selectContentCategory}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission: allPermissions, images })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
