// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAITags,
  handleDeleteAITags,
  handleGetAITags,
  handleUpdateAITags
} from "@/app/api/admin/preset/ai-tag/handler";

// methods
export const GET = handleGetAITags;

export const POST = handleAddAITags;

export const PATCH = handleUpdateAITags;

export const DELETE = handleDeleteAITags;
