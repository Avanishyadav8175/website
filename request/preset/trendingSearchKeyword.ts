// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { TRENDING_SEARCH_KEYWORD_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type Query } from "@/common/types/api/query";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

// variables
const API_URL = "/api/admin/preset/trending-search-keyword";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<TrendingSearchKeywordDocument>(URL);

// exports
export const fetchTrendingSearchKeyword = (
  query?: Query<TrendingSearchKeywordDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: TRENDING_SEARCH_KEYWORD_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: TRENDING_SEARCH_KEYWORD_REFRESH_INTERVAL }
  );
