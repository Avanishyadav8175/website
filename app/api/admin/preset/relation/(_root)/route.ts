// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddRelations,
  handleDeleteRelations,
  handleGetRelations,
  handleUpdateRelations
} from "@/app/api/admin/preset/relation/handler";

// methods
export const GET = handleGetRelations;

export const POST = handleAddRelations;

export const PATCH = handleUpdateRelations;

export const DELETE = handleDeleteRelations;
