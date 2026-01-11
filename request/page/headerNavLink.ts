// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { HEADER_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/page/header-nav-link";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<HeaderNavLinkDocument>(URL);

// exports
export const fetchHeaderNavLinks = (
  query?: Query<HeaderNavLinkDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    {
      active: true,
      select: ["label", "path", "sections", "quickLinks"],
      populate: [
        {
          path: "quickLinks.image",
          select: ["alt", "defaultAlt", "url"],
          strict: false
        },
        {
          path: "sections.links.tag",
          select: ["name"],
          populate: [
            {
              path: "color",
              select: ["hexCode"]
            }
          ],
          strict: false
        }
      ],
      sortBy: "order",
      orderBy: "asc"
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: HEADER_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: HEADER_REFRESH_INTERVAL }
  );
