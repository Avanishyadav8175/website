// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetCountryCode,
  handleUpdateCountryCode,
  handleDeleteCountryCode
} from "@/app/api/admin/preset/country-code/handler";

// methods
export const GET = handleGetCountryCode;

export const PATCH = handleUpdateCountryCode;

export const DELETE = handleDeleteCountryCode;
