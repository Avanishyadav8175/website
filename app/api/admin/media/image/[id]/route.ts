// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetImage,
  handleUpdateImage,
  handleDeleteImage
} from "@/app/api/admin/media/image/handler";

// methods
export const GET = handleGetImage;

export const PATCH = handleUpdateImage;

export const DELETE = handleDeleteImage;
