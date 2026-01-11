// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAITagCategories,
  handleDeleteAITagCategories,
  handleGetAITagCategories,
  handleUpdateAITagCategories
} from "@/app/api/admin/category/ai-tag-category/handler";

// methods
export const GET = handleGetAITagCategories;

export const POST = handleAddAITagCategories;

export const PATCH = handleUpdateAITagCategories;

export const DELETE = handleDeleteAITagCategories;
