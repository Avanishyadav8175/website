// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// constants
import { CONTENT_POPULATE } from "../content/contents";
import { DOMAIN } from "@/common/constants/domain";
import { SUB_TOPIC_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/page/sub-topic";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<SubTopicDocument>(URL);

// exports
export const fetchSubTopics = (
  query?: Query<SubTopicDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: SUB_TOPIC_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: SUB_TOPIC_REFRESH_INTERVAL }
  );

export const fetchSubtopic = (
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
          path: "category",
          select: ["name", "slug"]
        },
        {
          path: "topic",
          select: ["name", "slug"]
        },
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
        },
        {
          path: "contents",
          select: [
            "addons",
            "availability",
            "brand",
            "category",
            "customization",
            "delivery",
            "detail",
            "edible",
            "media",
            "name",
            "price",
            "quality",
            "redirectFrom",
            "seoMeta",
            "slug",
            "tag",
            "type",
            "variants"
          ],
          populate: CONTENT_POPULATE
        }
      ]
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: SUB_TOPIC_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: SUB_TOPIC_REFRESH_INTERVAL }
  );
