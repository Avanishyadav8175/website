// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCustomizationImages,
  handleGetCustomizationImages,
  handleDeleteCustomizationImages,
  handleUpdateCustomizationImages
} from "@/app/api/admin/media/customization-image/handler";

// methods
export const GET = handleGetCustomizationImages;

export const POST = handleAddCustomizationImages;

export const PATCH = handleUpdateCustomizationImages;

export const DELETE = handleDeleteCustomizationImages;
