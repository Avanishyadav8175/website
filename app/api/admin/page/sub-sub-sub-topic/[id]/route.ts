// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetSubSubSubTopic,
  handleUpdateSubSubSubTopic,
  handleDeleteSubSubSubTopic
} from "../handler";

// methods
export const GET = handleGetSubSubSubTopic;

export const PATCH = handleUpdateSubSubSubTopic;

export const DELETE = handleDeleteSubSubSubTopic;
