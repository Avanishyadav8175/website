// constants
import { CATEGORY_PAGE_SORT_OPTIONS } from "../constants/sort";

// utils
import { memo } from "react";

// types
import { type ChangeEvent } from "react";

function CategoryContentSort({
  sortBy,
  onChangeSortBy
}: {
  sortBy: string;
  onChangeSortBy: (sortBy: string) => void;
}) {
  return (
    <div className="max-sm:hidden relative flex items-center justify-end max-w-[200px] *:whitespace-nowrap overflow-x-scroll scrollbar-hide w-[100dvw] text-sm">
      <label
        htmlFor="sortBy"
        className="mr-1 max-sm:hidden"
      >
        Sort By:
      </label>
      <select
        id={"sortBy"}
        name={"sortBy"}
        className={
          "outline-none border-none rounded-xl transition-all duration-300 cursor-pointer bg-charcoal-3/5 hover:bg-charcoal-3/10 px-3.5 py-2"
        }
        value={sortBy}
        onChange={({
          target: { value: sortBy }
        }: ChangeEvent<HTMLSelectElement>) => {
          onChangeSortBy(sortBy);
        }}
      >
        {CATEGORY_PAGE_SORT_OPTIONS.map(({ label, value }, index) => (
          <option
            value={value}
            key={index}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(CategoryContentSort);
