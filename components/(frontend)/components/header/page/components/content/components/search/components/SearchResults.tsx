import SearchResultContents from "./SearchResultContents";
import SearchResultContentCategoriesAITags from "./SearchResultContentCategoriesAITags";
import SearchTrendingKeywords from "./SearchTrendingKeywords";
import { SearchContentsType } from "../SearchContentUI";
import { WEBSITE_NAME } from "@/common/constants/environmentVariables";

export default function SearchResults({
  aiTagsAndCategories,
  contents,
  indices,
  collapse
}: {
  aiTagsAndCategories: { aiTags: string[]; categories: string[][] } | null;
  contents: SearchContentsType[];
  indices: number[];
  collapse: () => void;
}) {
  return indices.length > 0 ? (
    <>
      <SearchResultContentCategoriesAITags
        categories={aiTagsAndCategories?.categories || []}
        aiTags={aiTagsAndCategories?.aiTags || []}
        collapse={collapse}
      />
      <SearchResultContents
        contents={contents}
        indices={indices}
        collapse={collapse}
      />
    </>
  ) : (
    <>
      <div className="font-medium text-xl sm:py-4">Explore {WEBSITE_NAME}</div>
      <SearchTrendingKeywords
        aiTags={aiTagsAndCategories?.aiTags || []}
        collapse={collapse}
      />
      {/* <SearchHistory /> */}
    </>
  );
}
