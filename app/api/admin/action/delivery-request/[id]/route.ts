// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetDeliveryRequest,
  handleUpdateDeliveryRequest,
  handleDeleteDeliveryRequest
} from "@/app/api/admin/action/delivery-request/handler";

// methods
export const GET = handleGetDeliveryRequest;

export const PATCH = handleUpdateDeliveryRequest;

export const DELETE = handleDeleteDeliveryRequest;
