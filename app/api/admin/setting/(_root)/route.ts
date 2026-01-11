// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddSettings,
  handleGetSettings
} from "@/app/api/admin/setting/handler";

// methods
export const GET = handleGetSettings;

export const POST = handleAddSettings;
