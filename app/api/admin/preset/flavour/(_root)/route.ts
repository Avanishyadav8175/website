// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddFlavours,
  handleDeleteFlavours,
  handleGetFlavours,
  handleUpdateFlavours
} from "@/app/api/admin/preset/flavour/handler";

// methods
export const GET = handleGetFlavours;

export const POST = handleAddFlavours;

export const PATCH = handleUpdateFlavours;

export const DELETE = handleDeleteFlavours;
