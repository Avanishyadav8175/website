// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetDelivery,
  handleUpdateDelivery,
  handleDeleteDelivery
} from "@/app/api/admin/dynamic/delivery/handler";

// methods
export const GET = handleGetDelivery;

export const PATCH = handleUpdateDelivery;

export const DELETE = handleDeleteDelivery;
