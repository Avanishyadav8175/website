// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectReviewGroup } from "@/store/features/presets/reviewGroupSlice";
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<ReviewGroupDocument>) => void;
}) {
  const dispatch = useDispatch();

  const { documents } = useSelector(selectReviewGroup.documentList);

  const contentCategoryStatus = useSelector(selectContentCategory.status);
  const { options: contentCategoryOptions } = useSelector(
    selectContentCategory.documentList
  );

  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocumentList());
    }
  }, [contentCategoryStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      category: (() => {
        const uniqueCategories = [
          ...Array.from(new Set(documents.map(({ category }) => category)))
        ];

        return contentCategoryOptions.filter(({ value }) =>
          uniqueCategories.includes(value)
        );
      })(),
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, contentCategoryOptions, onReturnOptions]);

  return null;
}
