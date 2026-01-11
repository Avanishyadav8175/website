"use client";

// hooks
import { useEffect, useState } from "react";

// redux
import {
  createBlogArticleAction,
  selectBlogArticle
} from "@/store/features/blogs/blogArticleSlice";

// layouts
import AdminTableLayout from "@/layouts/admin/table/AdminTableLayout";

// utils
import getDocumentsFromFormFieldsGenerator from "./utils/getDocumentsFromFormFieldsGenerator";
import getTableContentGenerator from "./utils/getTableContentGenerator";
import GetTableFilterKeywordOptions from "./utils/GetTableFilterKeywordOptions";

// components
import TableFormFields from "./components/TableFormFields";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import AdminBlogsForm from "@/components/(admin)/blog/AdminBlogsForm";
import { useDispatch, useSelector } from "@/store/withType";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import { allPermissions } from "@/common/constants/values";
import { AppStatesProvider } from "@/hooks/useAppState/useAppState";

export default function BlogArticleTable({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  const [filterKeywordOptions, setFilterKeywordOptions] = useState<
    FilterKeywordOptions<BlogArticleDocument>
  >({});
  const [blogDataInQ, setBlogDataInQ] = useState<BlogArticleDocument>();
  const [showCustomBlogForm, setShowCustomBlogForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const dispatch = useDispatch();

  const imageStatus = useSelector(selectImage.status);
  const contentStatus = useSelector(selectContent.status);
  const { documents: images } = useSelector(selectImage.documentList);
  const { documents: contents } = useSelector(selectContent.documentList);

  const handleCustomEdit = (id: string, data?: BlogArticleDocument) => {
    setBlogDataInQ((prev) => data);
    setIsEditing((prev) => true);
    setShowCustomBlogForm((prev) => true);
  };

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

  return (
    <>
      <GetTableFilterKeywordOptions onReturnOptions={setFilterKeywordOptions} />
      <AdminTableLayout
        userName={userName}
        isSuperAdmin={isSuperAdmin}
        permission={allPermissions}
        collectionName="Blog"
        documentName="Blog"
        createAction={createBlogArticleAction}
        select={selectBlogArticle}
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
          setShowCustomBlogForm((prev) => true);
        }}
      />

      <AppStatesProvider>
        {isEditing && blogDataInQ ? (
          <AdminBlogsForm
            open={showCustomBlogForm}
            onOpenChange={() => setShowCustomBlogForm((prev) => !prev)}
            isEditing
            toggleEditing={() => setIsEditing((prev) => false)}
            images={images}
            contents={contents}
            data={blogDataInQ}
          />
        ) : (
          <AdminBlogsForm
            open={showCustomBlogForm}
            onOpenChange={() => setShowCustomBlogForm((prev) => !prev)}
            isEditing={false}
            toggleEditing={() => setIsEditing((prev) => false)}
            images={images}
            contents={contents}
          />
        )}
      </AppStatesProvider>
    </>
  );
}
