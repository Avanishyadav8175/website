// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { COUNTRY_CODE_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type CountryCodeDocument } from "@/common/types/documentation/presets/countryCode";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/preset/country-code";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<CountryCodeDocument>(URL);

// exports
export const fetchCountryCodes = (
  query?: Query<CountryCodeDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: COUNTRY_CODE_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: COUNTRY_CODE_REFRESH_INTERVAL }
  );
