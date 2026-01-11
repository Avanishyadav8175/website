// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetSearchTag,
  handleUpdateSearchTag,
  handleDeleteSearchTag
} from "@/app/api/admin/preset/search-tag/handler";

// methods
export const GET = handleGetSearchTag;

export const PATCH = handleUpdateSearchTag;

export const DELETE = handleDeleteSearchTag;
