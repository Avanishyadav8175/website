// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// constants
import { CONTENT_POPULATE } from "../content/contents";
import { DOMAIN } from "@/common/constants/domain";
import { HOMEPAGE_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/page/homepage-layout";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<HomepageLayoutDocument>(URL);

// exports
export const fetchHomepageLayouts = (
  query?: Query<HomepageLayoutDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {
      active: true,
      select: ["layout", "order", "title", "type"],
      sortBy: "order",
      orderBy: "asc",
      populate: [
        {
          path: "layout.banner.images.desktop",
          select: ["alt", "defaultAlt", "url"]
        },
        {
          path: "layout.banner.images.mobile",
          select: ["alt", "defaultAlt", "url"]
        },
        {
          path: "layout.category.images.image",
          select: ["alt", "defaultAlt", "url"],
          strict: false
        },
        {
          path: "layout.collage.images.image",
          select: ["alt", "defaultAlt", "url"],
          strict: false
        },
        {
          path: "layout.content",
          select: [
            "type",
            "slug",
            "seoMeta",
            "quality",
            "price",
            "name",
            "media",
            "edible",
            "delivery",
            "detail",
            "availability"
          ],
          strict: false,
          populate: CONTENT_POPULATE
        }
      ]
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: HOMEPAGE_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: HOMEPAGE_REFRESH_INTERVAL }
  );
