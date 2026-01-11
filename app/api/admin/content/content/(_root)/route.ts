// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddContents,
  handleDeleteContents,
  handleGetContents,
  handleUpdateContents
} from "@/app/api/admin/content/content/handler";

// methods
export const GET = handleGetContents;

export const POST = handleAddContents;

export const PATCH = handleUpdateContents;

export const DELETE = handleDeleteContents;
