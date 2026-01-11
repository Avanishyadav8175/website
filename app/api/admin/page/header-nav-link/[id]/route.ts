// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetHeaderNavLink,
  handleUpdateHeaderNavLink,
  handleDeleteHeaderNavLink
} from "@/app/api/admin/page/header-nav-link/handler";

// methods
export const GET = handleGetHeaderNavLink;

export const PATCH = handleUpdateHeaderNavLink;

export const DELETE = handleDeleteHeaderNavLink;
