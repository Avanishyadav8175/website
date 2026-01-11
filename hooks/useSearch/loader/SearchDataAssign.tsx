"use client";

// hooks
import { useSearch } from "../useSearch";

// types
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

export default function SearchDataAssign({
  trendingKeywords
}: {
  trendingKeywords: TrendingSearchKeywordDocument[];
}) {
  const { onSetTrendingKeywords } = useSearch();

  onSetTrendingKeywords(trendingKeywords);

  return <></>;
}
