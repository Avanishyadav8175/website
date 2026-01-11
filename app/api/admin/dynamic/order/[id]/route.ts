// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetOrder,
  handleUpdateOrder,
  handleDeleteOrder
} from "@/app/api/admin/dynamic/order/handler";

// methods
export const GET = handleGetOrder;

export const PATCH = handleUpdateOrder;

export const DELETE = handleDeleteOrder;
