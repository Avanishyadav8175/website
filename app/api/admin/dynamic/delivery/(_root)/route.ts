// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddDeliveries,
  handleGetDeliveries
} from "@/app/api/admin/dynamic/delivery/handler";

// methods
export const GET = handleGetDeliveries;

export const POST = handleAddDeliveries;
