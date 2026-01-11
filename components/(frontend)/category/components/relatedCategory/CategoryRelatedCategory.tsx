// utils
import { memo } from "react";

// components
import CategoryRelatedCategories from "./CategoryRelatedCategories";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";

function CategoryRelatedCategory({
  categories
}: {
  categories: ContentCategoryDocument[];
}) {
  return (
    <div className="pt-5">
      <div
        className={`bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] p-3 py-4 sm:p-4 sm:py-5 rounded-2xl overflow-hidden`}
      >
        <CategoryRelatedCategories categories={categories} />
      </div>
    </div>
  );
}

export default memo(CategoryRelatedCategory);
