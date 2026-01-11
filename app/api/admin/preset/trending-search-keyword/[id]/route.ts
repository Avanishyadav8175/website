// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetTrendingSearchKeyword,
  handleUpdateTrendingSearchKeyword,
  handleDeleteTrendingSearchKeyword
} from "@/app/api/admin/preset/trending-search-keyword/handler";

// methods
export const GET = handleGetTrendingSearchKeyword;

export const PATCH = handleUpdateTrendingSearchKeyword;

export const DELETE = handleDeleteTrendingSearchKeyword;
