// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddFooterSections,
  handleGetFooterSections
} from "@/app/api/admin/page/footer-section/handler";

// methods
export const GET = handleGetFooterSections;

export const POST = handleAddFooterSections;
