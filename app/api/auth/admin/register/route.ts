// next config
export const dynamic = "force-dynamic";

// handlers
import { handleAdminRegister } from "@/app/api/auth/admin/handler";

export const POST = handleAdminRegister;
