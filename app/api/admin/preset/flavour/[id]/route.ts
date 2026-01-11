// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetFlavour,
  handleUpdateFlavour,
  handleDeleteFlavour
} from "@/app/api/admin/preset/flavour/handler";

// methods
export const GET = handleGetFlavour;

export const PATCH = handleUpdateFlavour;

export const DELETE = handleDeleteFlavour;
