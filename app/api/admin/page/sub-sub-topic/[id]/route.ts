// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetSubSubTopic,
  handleUpdateSubSubTopic,
  handleDeleteSubSubTopic
} from "../handler";

// methods
export const GET = handleGetSubSubTopic;

export const PATCH = handleUpdateSubSubTopic;

export const DELETE = handleDeleteSubSubTopic;
