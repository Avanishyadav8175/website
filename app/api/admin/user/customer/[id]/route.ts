// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCustomer,
  handleUpdateCustomer,
  handleDeleteCustomer
} from "@/app/api/admin/user/customer/handler";

// methods
export const GET = handleGetCustomer;

export const PATCH = handleUpdateCustomer;

export const DELETE = handleDeleteCustomer;
