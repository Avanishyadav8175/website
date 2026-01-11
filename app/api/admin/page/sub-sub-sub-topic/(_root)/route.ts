// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddSubSubSubTopics,
  handleGetSubSubSubTopics
} from "../handler";

// methods
export const GET = handleGetSubSubSubTopics;

export const POST = handleAddSubSubSubTopics;
