// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddOrders,
  handleGetOrders
} from "@/app/api/admin/dynamic/order/handler";

// methods
export const GET = handleGetOrders;

export const POST = handleAddOrders;
