"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";
import {
  createQuickLinkAction,
  selectQuickLink
} from "@/store/features/presets/quickLinkSlice";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";

export default function QuickLinkTable({
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
  const { documents: images } = useSelector(selectImage.documentList);

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<QuickLinkDocument>
  >({});

  // effects
  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Quick Links"
        documentName="Quick Link"
        createAction={createQuickLinkAction}
        select={selectQuickLink}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission, images })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
