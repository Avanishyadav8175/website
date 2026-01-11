// next config
export const dynamic = "force-dynamic";

// handlers
import { handleAdminLogin } from "@/app/api/auth/admin/handler";

export const POST = handleAdminLogin;
