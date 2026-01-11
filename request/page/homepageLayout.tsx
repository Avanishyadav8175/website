// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// constants
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
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: HOMEPAGE_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: HOMEPAGE_REFRESH_INTERVAL }
  );
