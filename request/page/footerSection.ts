// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { FOOTER_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/page/footer-section";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<FooterSectionDocument>(URL);

// exports
export const fetchFooterSections = (
  query?: Query<FooterSectionDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    {
      active: true,
      select: ["heading", "path", "links"],
      sortBy: "order",
      orderBy: "asc"
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: FOOTER_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: FOOTER_REFRESH_INTERVAL }
  );
