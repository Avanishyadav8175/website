// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddSubTopics,
  handleGetSubTopics
} from "@/app/api/admin/page/sub-topic/handler";

// methods
export const GET = handleGetSubTopics;

export const POST = handleAddSubTopics;
