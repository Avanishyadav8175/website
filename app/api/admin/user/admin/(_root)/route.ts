// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddAdmins,
  handleGetAdmins
} from "@/app/api/admin/user/admin/handler";

// methods
export const GET = handleGetAdmins;

export const POST = handleAddAdmins;
