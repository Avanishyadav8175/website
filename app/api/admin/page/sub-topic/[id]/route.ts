// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetSubTopic,
  handleUpdateSubTopic,
  handleDeleteSubTopic
} from "@/app/api/admin/page/sub-topic/handler";

// methods
export const GET = handleGetSubTopic;

export const PATCH = handleUpdateSubTopic;

export const DELETE = handleDeleteSubTopic;
