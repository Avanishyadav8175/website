// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetSetting,
  handleUpdateSetting,
  handleDeleteSetting
} from "@/app/api/admin/setting/handler";

// methods
export const GET = handleGetSetting;

export const PATCH = handleUpdateSetting;

export const DELETE = handleDeleteSetting;
