// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { AI_TAG_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/preset/ai-tag";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<AITagDocument>(URL);

// exports
export const fetchAITags = (
  query?: Query<AITagDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: AI_TAG_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: AI_TAG_REFRESH_INTERVAL }
  );
