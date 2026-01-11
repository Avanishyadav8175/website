// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddFoundUsSources,
  handleDeleteFoundUsSources,
  handleGetFoundUsSources,
  handleUpdateFoundUsSources
} from "@/app/api/admin/preset/found-us-source/handler";

// methods
export const GET = handleGetFoundUsSources;

export const POST = handleAddFoundUsSources;

export const PATCH = handleUpdateFoundUsSources;

export const DELETE = handleDeleteFoundUsSources;
