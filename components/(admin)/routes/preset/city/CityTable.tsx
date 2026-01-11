"use client";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useEffect, useState } from "react";

// redux
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";
import {
  createStateAction,
  selectState
} from "@/store/features/presets/stateSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function CityTable({
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
  const stateStatus = useSelector(selectState.status);

  const { documents: states } = useSelector((state) =>
    selectState.documentList(state, {
      active: true
    })
  );

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<CityDocument>
  >({});

  // effects
  useEffect(() => {
    if (stateStatus === "idle") {
      dispatch(createStateAction.fetchDocumentList());
    }
  }, [stateStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Cities"
        documentName="City"
        createAction={createCityAction}
        select={selectCity}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission: allPermissions, states })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
