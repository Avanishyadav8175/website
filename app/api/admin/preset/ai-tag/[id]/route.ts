// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetAITag,
  handleUpdateAITag,
  handleDeleteAITag
} from "@/app/api/admin/preset/ai-tag/handler";

// methods
export const GET = handleGetAITag;

export const PATCH = handleUpdateAITag;

export const DELETE = handleDeleteAITag;
