// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// constants
import { DOMAIN } from "@/common/constants/domain";
import { BLOG_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/blog/blog-article";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<BlogArticleDocument>(URL);

// exports
export const fetchBlogArticles = (
  query?: Query<BlogArticleDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: BLOG_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: BLOG_REFRESH_INTERVAL }
  );
export const fetchBlogArticle = (
  slug: string,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    {
      active: true,
      exclude: [
        "name",
        "layoutCounter",
        "createdBy",
        "updatedAt",
        "updatedBy",
        "isActive",
        "isDeleted"
      ],
      filterBy: "slug",
      keyword: slug,
      populate: [
        {
          path: "author",
          select: ["name", "photo", "bio"],
          populate: [
            {
              path: "photo",
              select: ["url", "alt", "defaultAlt"],
              strict: false
            }
          ]
        },
        {
          path: "categories",
          select: ["name"]
        },
        {
          path: "tags",
          select: ["name"]
        },
        {
          path: "layouts.layout.image.images",
          select: ["url", "alt", "defaultAlt"],
          strict: false
        },
        {
          path: "layouts.layout.content",
          select: ["name", "slug", "price", "edible"],
          strict: false,
          populate: [
            {
              path: "media.primary",
              select: ["url", "alt", "defaultAlt"]
            }
          ]
        }
      ]
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: BLOG_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: BLOG_REFRESH_INTERVAL }
  );


