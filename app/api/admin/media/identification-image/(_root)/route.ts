// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddIdentificationImages,
  handleDeleteIdentificationImages,
  handleGetIdentificationImages,
  handleUpdateIdentificationImages
} from "@/app/api/admin/media/identification-image/handler";

// methods
export const GET = handleGetIdentificationImages;

export const POST = handleAddIdentificationImages;

export const PATCH = handleUpdateIdentificationImages;

export const DELETE = handleDeleteIdentificationImages;
