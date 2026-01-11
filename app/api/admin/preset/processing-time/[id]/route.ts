// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetProcessingTime,
  handleUpdateProcessingTime,
  handleDeleteProcessingTime
} from "@/app/api/admin/preset/processing-time/handler";

// methods
export const GET = handleGetProcessingTime;

export const PATCH = handleUpdateProcessingTime;

export const DELETE = handleDeleteProcessingTime;
