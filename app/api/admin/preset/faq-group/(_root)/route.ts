// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddFAQGroups,
  handleDeleteFAQGroups,
  handleGetFAQGroups,
  handleUpdateFAQGroups
} from "@/app/api/admin/preset/faq-group/handler";

// methods
export const GET = handleGetFAQGroups;

export const POST = handleAddFAQGroups;

export const PATCH = handleUpdateFAQGroups;

export const DELETE = handleDeleteFAQGroups;
