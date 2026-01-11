// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddImages,
  handleDeleteImages,
  handleGetImages,
  handleUpdateImages
} from "@/app/api/admin/media/image/handler";

// methods
export const GET = handleGetImages;

export const POST = handleAddImages;

export const PATCH = handleUpdateImages;

export const DELETE = handleDeleteImages;
