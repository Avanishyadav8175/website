// handlers
import {
  handleGetFoundUsSource,
  handleUpdateFoundUsSource,
  handleDeleteFoundUsSource
} from "@/app/api/admin/preset/found-us-source/handler";

// methods
export const GET = handleGetFoundUsSource;

export const PATCH = handleUpdateFoundUsSource;

export const DELETE = handleDeleteFoundUsSource;
