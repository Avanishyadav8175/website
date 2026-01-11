// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetDeliveryType,
  handleUpdateDeliveryType,
  handleDeleteDeliveryType
} from "@/app/api/admin/preset/delivery-type/handler";

// methods
export const GET = handleGetDeliveryType;

export const PATCH = handleUpdateDeliveryType;

export const DELETE = handleDeleteDeliveryType;
