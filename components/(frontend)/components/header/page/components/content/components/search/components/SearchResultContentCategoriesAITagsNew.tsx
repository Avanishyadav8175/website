// utils
import { memo } from "react";

// components
import SearchResultAITagNew from "./SearchResultAITagNew";
import SearchResultContentCategoryNew from "./SearchResultContentCategoryNew";

// types
import { SearchBarInitialContentsType } from "../../../../../Header";

function SearchResultContentCategoriesAITagsNew({
  categories,
  aiTags,
  collapse
}: {
  categories: SearchBarInitialContentsType["categories"];
  aiTags: SearchBarInitialContentsType["aiTags"];
  collapse: () => void;
}) {
  return categories.length > 0 ? (
    <section className="flex flex-col gap-2 sm:py-1">
      <span className="font-medium text-lg text-charcoal-3">
        Categories
      </span>
      <section className="flex gap-2 overflow-y-scroll scrollbar-hide max-h-[30px] max-w-[97dvw] lg:max-w-[370px]">
        {categories.slice(0, 10).map(({ name, slug }, index) => (
          <SearchResultContentCategoryNew
            key={index}
            name={name}
            slug={slug}
            collapse={collapse}
          />
        ))}
      </section>
    </section>
  ) : (
    <></>
  );
}

export default memo(SearchResultContentCategoriesAITagsNew);
