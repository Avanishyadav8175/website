// next config
export const dynamic = "force-dynamic";

// handlers
import { handleCustomerRegister } from "@/app/api/auth/customer/handler";

export const POST = handleCustomerRegister;
