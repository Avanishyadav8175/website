// next config
export const dynamic = "force-dynamic";

// handlers
import { handleCustomerLogin } from "@/app/api/auth/customer/handler";

export const POST = handleCustomerLogin;
