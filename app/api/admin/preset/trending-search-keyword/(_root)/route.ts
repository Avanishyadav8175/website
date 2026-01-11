// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddTrendingSearchKeywords,
  handleDeleteTrendingSearchKeywords,
  handleGetTrendingSearchKeywords,
  handleUpdateTrendingSearchKeywords
} from "@/app/api/admin/preset/trending-search-keyword/handler";

// methods
export const GET = handleGetTrendingSearchKeywords;

export const POST = handleAddTrendingSearchKeywords;

export const PATCH = handleUpdateTrendingSearchKeywords;

export const DELETE = handleDeleteTrendingSearchKeywords;
