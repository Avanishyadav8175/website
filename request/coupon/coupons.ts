// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { COUPON_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/content/coupon";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<CouponDocument>(URL);

// exports
export const fetchAllCoupons = (
  query?: Query<CouponDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: COUPON_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: COUPON_REFRESH_INTERVAL }
  );
export const fetchCoupon = (slug: string, renderingStrategy?: "SSR" | "ISR") =>
  fetchDocuments(
    {
      active: true,
      exclude: [
        "createdBy",
        "updatedAt",
        "updatedBy",
        "isActive",
        "isDeleted",
        "createdAt"
      ],
      filterBy: "code",
      keyword: slug
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: COUPON_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: COUPON_REFRESH_INTERVAL }
  );
