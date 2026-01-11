// utils
import { memo } from "react";

// components
import CategoryContentSort from "./CategoryContentSort";

// types
import { type CategoryPageSort } from "../types/sort";

function CategoryContentCountSort({
  count,
  sortBy,
  onChangeSortBy
}: {
  count?: number;
  sortBy: CategoryPageSort;
  onChangeSortBy: (sortBy: string) => void;
}) {
  return (
    <div className="flex max-sm:flex-col items-start sm:items-center justify-start sm:justify-between py-5 max-sm:px-3.5">
      <div className="text-lg sm:text-xl font-medium max-1200:px-2 whitespace-nowrap text-charcoal-3/80">
        {count || 0} Products
      </div>
      <CategoryContentSort
        sortBy={sortBy}
        onChangeSortBy={onChangeSortBy}
      />
    </div>
  );
}

export default memo(CategoryContentCountSort);
