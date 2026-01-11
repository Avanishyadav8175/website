"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createEnhancementAction,
  selectEnhancement
} from "@/store/features/presets/enhancementSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function EnhancementTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const dispatch = useDispatch();

  const imageStatus = useSelector(selectImage.status);
  const { documents: images } = useSelector(selectImage.documentList);

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<EnhancementDocument>
  >({});

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
        permission={allPermissions}
        collectionName="Enhancements"
        documentName="Enhancement"
        createAction={createEnhancementAction}
        select={selectEnhancement}
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
