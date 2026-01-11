// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetTopic,
  handleUpdateTopic,
  handleDeleteTopic
} from "@/app/api/admin/page/topic/handler";

// methods
export const GET = handleGetTopic;

export const PATCH = handleUpdateTopic;

export const DELETE = handleDeleteTopic;
