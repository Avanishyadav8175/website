// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddHeaderNavLinks,
  handleGetHeaderNavLinks
} from "@/app/api/admin/page/header-nav-link/handler";

// methods
export const GET = handleGetHeaderNavLinks;

export const POST = handleAddHeaderNavLinks;
