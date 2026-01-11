"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCatalogueAction,
  selectCatalogue
} from "@/store/features/presets/catalogueSlice";
import {
  createCatalogueCategoryAction,
  selectCatalogueCategory
} from "@/store/features/categories/catalogueCategorySlice";
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
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function CatalogueTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const dispatch = useDispatch();

  // redux
  const catalogueCategoryStatus = useSelector(selectCatalogueCategory.status);
  const imageStatus = useSelector(selectImage.status);

  const { documents: catalogueCategories } = useSelector((state) =>
    selectCatalogueCategory.documentList(state, {
      active: true
    })
  );
  const { documents: images } = useSelector(selectImage.documentList);

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<CatalogueDocument>
  >({});

  useEffect(() => {
    if (catalogueCategoryStatus === "idle") {
      dispatch(createCatalogueCategoryAction.fetchDocumentList());
    }
  }, [catalogueCategoryStatus, dispatch]);

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
        collectionName="Mobile Navbar Categories"
        documentName="Mobile Navbar Categories"
        createAction={createCatalogueAction}
        select={selectCatalogue}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission: allPermissions,
          catalogueCategories,
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
