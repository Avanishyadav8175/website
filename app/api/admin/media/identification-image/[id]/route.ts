// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetIdentificationImage,
  handleUpdateIdentificationImage,
  handleDeleteIdentificationImage
} from "@/app/api/admin/media/identification-image/handler";

// methods
export const GET = handleGetIdentificationImage;

export const PATCH = handleUpdateIdentificationImage;

export const DELETE = handleDeleteIdentificationImage;
