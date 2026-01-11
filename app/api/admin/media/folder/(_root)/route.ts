// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddFolders,
  handleGetFolders
} from "@/app/api/admin/media/folder/handler";

// methods
export const GET = handleGetFolders;

export const POST = handleAddFolders;
