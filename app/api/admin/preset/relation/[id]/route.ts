// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetRelation,
  handleUpdateRelation,
  handleDeleteRelation
} from "@/app/api/admin/preset/relation/handler";

// methods
export const GET = handleGetRelation;

export const PATCH = handleUpdateRelation;

export const DELETE = handleDeleteRelation;
