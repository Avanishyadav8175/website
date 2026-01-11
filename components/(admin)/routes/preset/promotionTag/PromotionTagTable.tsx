"use client";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useEffect, useState } from "react";

// redux
import {
  createColorAction,
  selectColor
} from "@/store/features/presets/colorSlice";
import {
  createPromotionTagAction,
  selectPromotionTag
} from "@/store/features/presets/promotionTagSlice";

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
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { allPermissions } from "@/common/constants/values";

export default function PromotionTagTable({
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
  const colorStatus = useSelector(selectColor.status);

  const { documents: colors } = useSelector((state) =>
    selectColor.documentList(state, {
      active: true
    })
  );

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<PromotionTagDocument>
  >({});

  // effects
  useEffect(() => {
    if (colorStatus === "idle") {
      dispatch(createColorAction.fetchDocumentList());
    }
  }, [colorStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Promotion Tags"
        documentName="Promotion Tag"
        createAction={createPromotionTagAction}
        select={selectPromotionTag}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission: allPermissions, colors: colors })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
