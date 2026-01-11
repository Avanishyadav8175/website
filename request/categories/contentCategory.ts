// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { CONTENT_CATEGORY_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/category/content-category";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<ContentCategoryDocument>(URL);

// exports
export const fetchContentCategories = (
  query?: Query<ContentCategoryDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_CATEGORY_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_CATEGORY_REFRESH_INTERVAL }
  );
export const fetchContentCategory = (
  slug: string,
  renderingStrategy?: "SSR" | "ISR"
) =>
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
      filterBy: "slug",
      keyword: slug,
      populate: [
        {
          path: "media.banner.images.desktop",
          select: ["alt", "defaultAlt", "url"]
        },
        {
          path: "media.banner.images.mobile",
          select: ["alt", "defaultAlt", "url"]
        },
        {
          path: "media.quickLinks.image",
          select: ["alt", "defaultAlt", "url"],
          strict: false
        },
        {
          path: "relatedCategories.categories",
          select: ["name", "slug"],
          strict: false,
          populate: [
            { path: "media.icon", select: ["alt", "defaultAlt", "url"] }
          ]
        }
      ]
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_CATEGORY_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_CATEGORY_REFRESH_INTERVAL }
  );
