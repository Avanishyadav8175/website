// utils
import { memo } from "react";

// components
import SearchResultContentCategoriesAITagsNew from "./SearchResultContentCategoriesAITagsNew";
import SearchResultContentsNew from "./SearchResultContentsNew";
import SearchTrendingKeywordsNew from "./SearchTrendingKeywordsNew";

// types
import { type SearchBarInitialContentsType } from "../../../../../Header";
import { type SearchContentsType } from "../SearchContentUI";

function SearchResultsNew({
  aiTagsAndCategories,
  contents,
  indices,
  collapse
}: {
  aiTagsAndCategories: SearchBarInitialContentsType | null;
  contents: SearchContentsType[];
  indices: number[];
  collapse: () => void;
}) {
  return indices.length > 0 ? (
    <>
      <SearchResultContentCategoriesAITagsNew
        categories={aiTagsAndCategories?.categories || []}
        aiTags={aiTagsAndCategories?.aiTags || []}
        collapse={collapse}
      />
      <SearchResultContentsNew
        contents={contents}
        indices={indices}
        collapse={collapse}
      />
    </>
  ) : (
    <>
      <SearchTrendingKeywordsNew
        trendingKeywords={aiTagsAndCategories?.trendingKeywords || []}
        collapse={collapse}
      />
    </>
  );
}

export default memo(SearchResultsNew);
