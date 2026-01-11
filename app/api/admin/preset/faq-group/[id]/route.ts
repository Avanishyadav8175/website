// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetFAQGroup,
  handleUpdateFAQGroup,
  handleDeleteFAQGroup
} from "@/app/api/admin/preset/faq-group/handler";

// methods
export const GET = handleGetFAQGroup;

export const PATCH = handleUpdateFAQGroup;

export const DELETE = handleDeleteFAQGroup;
