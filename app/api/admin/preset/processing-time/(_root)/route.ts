// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddProcessingTimes,
  handleDeleteProcessingTimes,
  handleGetProcessingTimes,
  handleUpdateProcessingTimes
} from "@/app/api/admin/preset/processing-time/handler";

// methods
export const GET = handleGetProcessingTimes;

export const POST = handleAddProcessingTimes;

export const PATCH = handleUpdateProcessingTimes;

export const DELETE = handleDeleteProcessingTimes;
