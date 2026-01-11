// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAITagCategory,
  handleUpdateAITagCategory,
  handleDeleteAITagCategory
} from "@/app/api/admin/category/ai-tag-category/handler";

// methods
export const GET = handleGetAITagCategory;

export const PATCH = handleUpdateAITagCategory;

export const DELETE = handleDeleteAITagCategory;
