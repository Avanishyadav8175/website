// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetFolder,
  handleUpdateFolder,
  handleDeleteFolder
} from "@/app/api/admin/media/folder/handler";

// methods
export const GET = handleGetFolder;

export const PATCH = handleUpdateFolder;

export const DELETE = handleDeleteFolder;
