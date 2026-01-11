// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// requests
import { fetchTrendingKeywords } from "@/request/search/trendingKeywords";

// components
import SearchDataAssign from "./SearchDataAssign";

// types
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

async function getTrendingKeywords() {
  try {
    const response = await fetchTrendingKeywords(RENDERING_STRATEGY);

    if (response.data) {
      return response.data as TrendingSearchKeywordDocument[];
    }
  } catch (error) {
    return [];
  }

  return [];
}

export default async function SearchDataLoader() {
  const trendingKeywords = await getTrendingKeywords();

  return <SearchDataAssign trendingKeywords={trendingKeywords} />;
}
