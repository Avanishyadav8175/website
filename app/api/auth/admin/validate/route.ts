// next config
export const dynamic = "force-dynamic";

// handlers
import { handleAdminValidate } from "@/app/api/auth/admin/handler";

export const GET = handleAdminValidate;
