"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAddonAction,
  selectAddon
} from "@/store/features/contents/addonSlice";
import {
  createAddonCategoryAction,
  selectAddonCategory
} from "@/store/features/categories/addonCategorySlice";
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
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function AddonTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const dispatch = useDispatch();

  const addonCategoryStatus = useSelector(selectAddonCategory.status);
  const { documents: addonCategories } = useSelector((state) =>
    selectAddonCategory.documentList(state, {
      active: true
    })
  );

  const imageStatus = useSelector(selectImage.status);
  const { documents: images } = useSelector(selectImage.documentList);

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<AddonDocument>
  >({});

  useEffect(() => {
    if (addonCategoryStatus === "idle") {
      dispatch(createAddonCategoryAction.fetchDocumentList());
    }
  }, [addonCategoryStatus, dispatch]);

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
        collectionName="Addons"
        documentName="Addon"
        createAction={createAddonAction}
        select={selectAddon}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission: allPermissions,
          addonCategories,
          images
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
