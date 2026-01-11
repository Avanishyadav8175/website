// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetDeliveryDetail,
  handleUpdateDeliveryDetail,
  handleDeleteDeliveryDetail
} from "@/app/api/admin/preset/delivery-detail/handler";

// methods
export const GET = handleGetDeliveryDetail;

export const PATCH = handleUpdateDeliveryDetail;

export const DELETE = handleDeleteDeliveryDetail;
