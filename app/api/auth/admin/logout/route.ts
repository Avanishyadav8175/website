// next config
export const dynamic = "force-dynamic";

// handlers
import { handleAdminLogout } from "@/app/api/auth/admin/handler";

export const GET = handleAdminLogout;
