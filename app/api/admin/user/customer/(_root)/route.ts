// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCustomers,
  handleGetCustomers
} from "@/app/api/admin/user/customer/handler";

// methods
export const GET = handleGetCustomers;

export const POST = handleAddCustomers;
