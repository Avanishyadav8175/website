"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import {
  createDynamicPageAction,
  selectDynamicPageLayout
} from "@/store/features/pages/dynamicSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import AdminDynamicPageManagementPopup from "./components/popupManagement/AdminDynamicPageManagementPopup";
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";
import TableFormFields from "./components/TableFormFields";

// types
import { DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";
import { FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { allPermissions } from "@/common/constants/values";

export default function DynamicPageTable({
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
  const { toast } = useToast();

  // redux
  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector(selectImage.documentList);

  const contentStatus = useSelector(selectContent.status);

  const { documents: contents } = useSelector(selectContent.documentList);

  // states
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<DynamicPageDocument>
  >({});
  const [dynamicDataInQ, setDynamicDataInQ] = useState<
    DynamicPageDocument | undefined
  >(undefined);
  const [showManagementPopup, setShowManagementPopup] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // event handlers
  const handleCustomEdit = (id: string, data?: DynamicPageDocument) => {
    setDynamicDataInQ((prev) => data);
    setIsEditing((prev) => true);
    setShowManagementPopup((prev) => true);
  };

  // side effects
  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (!showManagementPopup) {
      setDynamicDataInQ((prev) => undefined);
    }
  }, [showManagementPopup]);

  const saveNewDynamicPage = (data: DynamicPageDocument) => {
    if (data && data.name && data.slug && data.layouts.length > 0) {
      const dynamicPage: DynamicPageDocument = {
        ...data,
        createdBy: "Someone",
        updatedBy: "Someone"
      } as DynamicPageDocument;

      dispatch(
        createDynamicPageAction.addDocuments({ newDocuments: dynamicPage })
      );

      toast({
        title: "Dynamic page added",
        description: "May take some time to reflect",
        variant: "success"
      });
    } else
      toast({
        title: "Dynamic page could't be added",
        description: "Some required data was not added",
        variant: "destructive"
      });

    setDynamicDataInQ((prev) => undefined);
  };

  const saveModificationsToDynamicPage = (
    id: string,
    updatedData: Partial<DynamicPageDocument>
  ) => {
    if (id.length && updatedData) {
      dispatch(
        createDynamicPageAction.updateDocument({
          documentId: id,
          updateData: updatedData
        })
      );

      toast({
        title: "Dynamic page updated",
        description: "May take some time to reflect",
        variant: "success"
      });
    } else
      toast({
        title: "Dynamic page could't be updated",
        variant: "destructive"
      });

    setDynamicDataInQ((prev) => undefined);
  };

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Smaller Pages"
        documentName="Smaller Page"
        createAction={createDynamicPageAction}
        select={selectDynamicPageLayout}
        filterKeywordOptions={filterKeywordOptions}
        getContent={getTableContentGenerator({
          permission: allPermissions,
          customEdit: handleCustomEdit
        })}
        getFormFields={({ initialDocument }) => (
          <TableFormFields initialDocument={initialDocument} />
        )}
        getDocumentsFromFormFields={getDocumentsFromFormFieldsGenerator()}
        customAdd
        onClickCustomAdd={() => {
          setIsEditing((prev) => false);
          setShowManagementPopup((prev) => true);
        }}
      />

      <AdminDynamicPageManagementPopup
        open={showManagementPopup}
        setOpen={setShowManagementPopup}
        dataInQ={dynamicDataInQ}
        images={images}
        contents={contents}
        saveNewDynamicPage={saveNewDynamicPage}
        saveModificationsToDynamicPage={saveModificationsToDynamicPage}
      />
    </>
  );
}
