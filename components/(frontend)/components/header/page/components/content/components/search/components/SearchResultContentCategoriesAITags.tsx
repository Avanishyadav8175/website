// components
import SearchResultAITag from "./SearchResultAITag";
import SearchResultContentCategory from "./SearchResultContentCategory";

export default function SearchResultContentCategoriesAITags({
  categories,
  aiTags,
  collapse
}: {
  categories: string[][];
  aiTags: string[];
  collapse: () => void;
}) {
  return categories.length > 0 ? (
    <section className="flex flex-col gap-2 sm:py-4">
      <span className="font-medium text-lg text-charcoal-3">
        Categories
      </span>
      <section className="flex gap-2 flex-wrap overflow-auto scrollbar-hide max-h-[70px]">
        {categories.slice(0, 10).map(([name, slug], index) => (
          <SearchResultContentCategory
            key={index}
            name={name}
            slug={slug}
            collapse={collapse}
          />
        ))}
        {aiTags.slice(0, 10).map((aiTag, index) => (
          <SearchResultAITag
            key={index}
            name={aiTag}
            collapse={collapse}
          />
        ))}
      </section>
    </section>
  ) : (
    <></>
  );
}
