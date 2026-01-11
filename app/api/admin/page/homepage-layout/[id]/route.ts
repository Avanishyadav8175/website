// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetHomepageLayout,
  handleUpdateHomepageLayout,
  handleDeleteHomepageLayout
} from "@/app/api/admin/page/homepage-layout/handler";

// methods
export const GET = handleGetHomepageLayout;

export const PATCH = handleUpdateHomepageLayout;

export const DELETE = handleDeleteHomepageLayout;
