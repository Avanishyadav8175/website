// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetContent,
  handleUpdateContent,
  handleDeleteContent
} from "@/app/api/admin/content/content/handler";

// methods
export const GET = handleGetContent;

export const PATCH = handleUpdateContent;

export const DELETE = handleDeleteContent;
