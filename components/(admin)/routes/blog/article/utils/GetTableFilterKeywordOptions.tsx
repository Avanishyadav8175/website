// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectBlogArticle } from "@/store/features/blogs/blogArticleSlice";
import {
  createBlogAuthorAction,
  selectBlogAuthor
} from "@/store/features/blogs/blogAuthorSlice";
import {
  createBlogCategoryAction,
  selectBlogCategory
} from "@/store/features/blogs/blogCategorySlice";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import {
  createBlogTagAction,
  selectBlogTag
} from "@/store/features/blogs/blogTagSlice";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<BlogArticleDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const { documents } = useSelector(selectBlogArticle.documentList);

  const blogAuthorStatus = useSelector(selectBlogAuthor.status);
  const { options: blogAuthorOptions } = useSelector(
    selectBlogAuthor.documentList
  );

  const blogCategoryStatus = useSelector(selectBlogCategory.status);
  const { options: blogCategoryOptions } = useSelector(
    selectBlogCategory.documentList
  );

  const blogTagStatus = useSelector(selectBlogCategory.status);
  const { options: blogTagOptions } = useSelector(selectBlogTag.documentList);

  // effects
  useEffect(() => {
    if (blogAuthorStatus === "idle") {
      dispatch(createBlogAuthorAction.fetchDocumentList());
    }
  }, [blogAuthorStatus, dispatch]);

  useEffect(() => {
    if (blogCategoryStatus === "idle") {
      dispatch(createBlogCategoryAction.fetchDocumentList());
    }
  }, [blogCategoryStatus, dispatch]);

  useEffect(() => {
    if (blogTagStatus === "idle") {
      dispatch(createBlogTagAction.fetchDocumentList());
    }
  }, [blogTagStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      author: (() => {
        const uniqueAuthors = [
          ...Array.from(new Set(documents.map(({ author }) => author)))
        ];

        return blogAuthorOptions.filter(({ value }) =>
          uniqueAuthors.includes(value)
        );
      })(),
      categories: (() => {
        const uniqueCategories = [
          ...Array.from(
            new Set(
              documents.flatMap(({ categories }) => categories as string[])
            )
          )
        ];

        return blogCategoryOptions.filter(({ value }) =>
          uniqueCategories.includes(value)
        );
      })(),
      tags: (() => {
        const uniqueTags = [
          ...Array.from(
            new Set(documents.flatMap(({ tags }) => tags as string[]))
          )
        ];

        return blogTagOptions.filter(({ value }) => uniqueTags.includes(value));
      })(),
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [
    documents,
    blogAuthorOptions,
    blogCategoryOptions,
    blogTagOptions,
    onReturnOptions
  ]);

  return null;
}
