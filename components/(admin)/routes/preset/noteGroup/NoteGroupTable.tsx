"use client";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useEffect, useState } from "react";

// redux
import {
  createNoteGroupAction,
  selectNoteGroup
} from "@/store/features/presets/noteGroupSlice";
import {
  createOccasionAction,
  selectOccasion
} from "@/store/features/presets/occasionSlice";

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
import { type NoteGroupDocument } from "@/common/types/documentation/presets/noteGroup";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function NoteGroupTable({
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
  const occasionStatus = useSelector(selectOccasion.status);

  const { documents: occasions } = useSelector((state) =>
    selectOccasion.documentList(state, {
      active: true
    })
  );

  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<NoteGroupDocument>
  >({});

  // effects
  useEffect(() => {
    if (occasionStatus === "idle") {
      dispatch(createOccasionAction.fetchDocumentList());
    }
  }, [occasionStatus, dispatch]);

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={permission}
        collectionName="Notes"
        documentName="Note"
        createAction={createNoteGroupAction}
        select={selectNoteGroup}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({ permission, occasions })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
      />
    </>
  );
}
