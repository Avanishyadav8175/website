// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddSubSubTopics,
  handleGetSubSubTopics
} from "../handler";

// methods
export const GET = handleGetSubSubTopics;

export const POST = handleAddSubSubTopics;
