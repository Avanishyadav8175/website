// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddDynamicPages,
  handleGetDynamicPages
} from "@/app/api/admin/page/dynamic-page/handler";

// methods
export const GET = handleGetDynamicPages;

export const POST = handleAddDynamicPages;
