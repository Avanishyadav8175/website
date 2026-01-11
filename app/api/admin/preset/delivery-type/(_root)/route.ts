// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddDeliveryTypes,
  handleDeleteDeliveryTypes,
  handleGetDeliveryTypes,
  handleUpdateDeliveryTypes
} from "@/app/api/admin/preset/delivery-type/handler";

// methods
export const GET = handleGetDeliveryTypes;

export const POST = handleAddDeliveryTypes;

export const PATCH = handleUpdateDeliveryTypes;

export const DELETE = handleDeleteDeliveryTypes;
