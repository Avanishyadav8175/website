// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetDynamicPage,
  handleUpdateDynamicPage,
  handleDeleteDynamicPage
} from "@/app/api/admin/page/dynamic-page/handler";

// methods
export const GET = handleGetDynamicPage;

export const PATCH = handleUpdateDynamicPage;

export const DELETE = handleDeleteDynamicPage;
