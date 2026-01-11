// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddCountryCodes,
  handleDeleteCountryCodes,
  handleGetCountryCodes,
  handleUpdateCountryCodes
} from "@/app/api/admin/preset/country-code/handler";

// methods
export const GET = handleGetCountryCodes;

export const POST = handleAddCountryCodes;

export const PATCH = handleUpdateCountryCodes;

export const DELETE = handleDeleteCountryCodes;
