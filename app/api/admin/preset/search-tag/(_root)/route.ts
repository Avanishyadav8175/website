// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddSearchTags,
  handleDeleteSearchTags,
  handleGetSearchTags,
  handleUpdateSearchTags
} from "@/app/api/admin/preset/search-tag/handler";

// methods
export const GET = handleGetSearchTags;

export const POST = handleAddSearchTags;

export const PATCH = handleUpdateSearchTags;

export const DELETE = handleDeleteSearchTags;
