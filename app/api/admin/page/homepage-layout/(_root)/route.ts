// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddHomepageLayouts,
  handleGetHomepageLayouts,
  handleUpdateHomepageLayouts,
  handleDeleteHomepageLayouts
} from "@/app/api/admin/page/homepage-layout/handler";

// methods
export const GET = handleGetHomepageLayouts;

export const POST = handleAddHomepageLayouts;

export const PATCH = handleUpdateHomepageLayouts;

export const DELETE = handleDeleteHomepageLayouts;
