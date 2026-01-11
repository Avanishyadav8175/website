// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddTopics,
  handleGetTopics
} from "@/app/api/admin/page/topic/handler";

// methods
export const GET = handleGetTopics;

export const POST = handleAddTopics;
