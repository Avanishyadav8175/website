// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddDeliveryRequests,
  handleGetDeliveryRequests
} from "@/app/api/admin/action/delivery-request/handler";

// methods
export const GET = handleGetDeliveryRequests;

export const POST = handleAddDeliveryRequests;
