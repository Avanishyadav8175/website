// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetFooterSection,
  handleUpdateFooterSection,
  handleDeleteFooterSection
} from "@/app/api/admin/page/footer-section/handler";

// methods
export const GET = handleGetFooterSection;

export const PATCH = handleUpdateFooterSection;

export const DELETE = handleDeleteFooterSection;
