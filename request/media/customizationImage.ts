// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { FOOTER_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";

// variables
const API_URL = "/api/admin/media/customization-image";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { addDocuments } = getRequest<CustomizationImageDocument>(URL);

// exports
export const addCustomizationImages = (
  data: CustomizationImageDocument | CustomizationImageDocument[],
  renderingStrategy?: "SSR" | "ISR"
) =>
  addDocuments(
    data,
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: FOOTER_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: FOOTER_REFRESH_INTERVAL }
  );
