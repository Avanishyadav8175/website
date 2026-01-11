// utils
import { memo } from "react";

// components
import CategoryRelatedCategory from "./CategoryRelatedCategory";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";

function CategoryRelatedCategorySection({
  relatedCategories
}: {
  relatedCategories?: RelatedContentCategoriesDocument;
}) {
  if (
    relatedCategories &&
    relatedCategories.show &&
    relatedCategories.categories &&
    relatedCategories.categories.length
  ) {
    return (
      <CategoryRelatedCategory
        categories={relatedCategories.categories as ContentCategoryDocument[]}
      />
    );
  }

  return <></>;
}

export default memo(CategoryRelatedCategorySection);
