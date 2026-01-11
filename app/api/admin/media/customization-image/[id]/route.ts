// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCustomizationImage,
  handleUpdateCustomizationImage,
  handleDeleteCustomizationImage
} from "@/app/api/admin/media/customization-image/handler";

// methods
export const GET = handleGetCustomizationImage;

export const PATCH = handleUpdateCustomizationImage;

export const DELETE = handleDeleteCustomizationImage;
