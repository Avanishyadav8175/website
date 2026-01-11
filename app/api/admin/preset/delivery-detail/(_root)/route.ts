// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddDeliveryDetails,
  handleDeleteDeliveryDetails,
  handleGetDeliveryDetails,
  handleUpdateDeliveryDetails
} from "@/app/api/admin/preset/delivery-detail/handler";

// methods
export const GET = handleGetDeliveryDetails;

export const POST = handleAddDeliveryDetails;

export const PATCH = handleUpdateDeliveryDetails;

export const DELETE = handleDeleteDeliveryDetails;
