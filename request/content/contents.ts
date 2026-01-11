// constants
import { DOMAIN } from "@/common/constants/domain";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { CONTENT_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// utils
import getRequest from "@/common/utils/api/getRequest";

// types
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { GeneratePopulate, type Query } from "@/common/types/api/query";

// variables
const API_URL = "/api/admin/content/content";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

// requests
const { fetchDocuments } = getRequest<ContentDocument>(URL);

export const CONTENT_POPULATE:
  | GeneratePopulate<null, ContentDocument>[]
  | undefined = [
  // ADDONS -----------------------------------
  {
    path: "addons.addon",
    select: ["edible", "image", "category", "name", "price"],
    populate: [
      { path: "category", select: ["name"] },
      { path: "image", select: ["alt", "defaultAlt", "url"] }
    ]
  },
  // MEDIA -----------------------------------
  { path: "media.primary", select: ["defaultAlt", "alt", "url"] },
  { path: "media.gallery", select: ["defaultAlt", "alt", "url"] },

  // CATEGORY -----------------------------------
  {
    path: "category.primary",
    select: ["name", "slug"],
    populate: [{ path: "charges.advancePayment", select: ["value"] }]
  },
  { path: "category.related", select: ["slug", "name"] },

  // DETAIL -------------------------------------
  { path: "detail.cancellationPolicy", select: ["label", "content"] },
  { path: "detail.faqGroup", select: ["faqs"] },
  { path: "detail.deliveryDetail", select: ["label", "content"] },
  { path: "detail.careInfo", select: ["label", "content"] },
  { path: "detail.colors", select: ["hexCode"] },
  { path: "detail.occasions", select: ["name"] },
  { path: "detail.relations", select: ["name"] },

  // TAGS -----------------------------------------
  {
    path: "tag.aiTags",
    select: []
  },
  {
    path: "tag.relatedAITags",
    select: ["name"],
    strict: false
  },
  {
    path: "tag.promotionTag",
    select: ["name", "color"],
    populate: [{ path: "color", select: ["hexCode", "name"] }],
    strict: false
  },
  { path: "tag.searchTags", select: ["name"] },

  // VARIANTS -----------------------------------------
  { path: "variants.label", select: ["label"] },
  {
    path: "variants.custom.unit",
    select: ["abbr", "name", "serves"],
    strict: false
  },
  {
    path: "variants.reference.reference",
    populate: [
      { path: "variants.label", select: ["label"] },
      {
        path: "variants.custom.unit",
        select: ["abbr", "name", "serves"],
        strict: false
      },
      {
        path: "variants.reference.reference",
        populate: [{ path: "variants.label", select: ["label"] }]
      },
      {
        path: "addons.addon",
        select: ["edible", "image", "category", "name", "price"],
        populate: [
          { path: "category", select: ["name"] },
          { path: "image", select: ["alt", "defaultAlt", "url"] }
        ]
      },
      // MEDIA -----------------------------------
      { path: "media.primary", select: ["defaultAlt", "alt", "url"] },
      { path: "media.gallery", select: ["defaultAlt", "alt", "url"] },

      // CATEGORY -----------------------------------
      {
        path: "category.primary",
        select: ["name", "slug"],
        populate: [{ path: "charges.advancePayment", select: ["value"] }]
      },
      { path: "category.related", select: ["slug", "name"] },

      // DETAIL -------------------------------------
      { path: "detail.cancellationPolicy", select: ["label", "content"] },
      { path: "detail.faqGroup", select: ["faqs"] },
      { path: "detail.deliveryDetail", select: ["label", "content"] },
      { path: "detail.careInfo", select: ["label", "content"] },
      { path: "detail.colors", select: ["hexCode"] },
      { path: "detail.occasions", select: ["name"] },
      { path: "detail.relations", select: ["name"] },

      // TAGS -----------------------------------------
      {
        path: "tag.aiTags",
        select: []
      },
      {
        path: "tag.relatedAITags",
        select: [],
        strict: false
      },
      {
        path: "tag.promotionTag",
        select: ["name", "color"],
        populate: [{ path: "color", select: ["hexCode", "name"] }],
        strict: false
      },
      { path: "tag.searchTags", select: ["name"] },
      {
        path: "customization.balloonColor.groups",
        select: ["colors", "name"]
      },
      {
        path: "customization.balloonColor.label",
        select: ["label"]
      },
      {
        path: "customization.enhancement.items.enhancement",
        select: ["label", "image"],
        populate: [{ path: "image", select: ["alt", "defaultAlt", "url"] }]
      },
      {
        path: "customization.enhancement.label",
        select: ["label"]
      },
      {
        path: "customization.flavour.default",
        select: ["name"]
      },
      {
        path: "customization.flavour.label",
        select: ["label"]
      },
      {
        path: "customization.flavour.options.flavour",
        select: ["name"]
      },
      {
        path: "customization.upgrade.default",
        select: ["label"]
      },
      {
        path: "customization.upgrade.label",
        select: ["label"]
      },
      {
        path: "customization.upgrade.options.upgrade",
        select: ["label"]
      },
      {
        path: "customization.uploadImage.label",
        select: ["label"]
      },
      {
        path: "customization.uploadText.label",
        select: ["label"]
      },

      // DELIVERY -----------------------------------------
      { path: "delivery.processingTime", select: ["hours", "label"] },
      { path: "delivery.slots.type", select: ["name", "price", "timeSlots"] },

      // PRICE -----------------------------------------
      { path: "price.cities.city", select: ["name"] }
    ]
  },
  {
    path: "variants.custom.variants.image",
    select: ["alt", "defaultAlt", "url"],
    strict: false
  },
  {
    path: "variants.custom.variants.price.cities.city",
    select: ["aliases", "name", "state"]
  },

  // CUSTOMIZATIONS -----------------------------------------
  {
    path: "customization.balloonColor.groups",
    select: ["colors", "name"]
  },
  {
    path: "customization.balloonColor.label",
    select: ["label"]
  },
  {
    path: "customization.enhancement.items.enhancement",
    select: ["label", "image"],
    populate: [{ path: "image", select: ["alt", "defaultAlt", "url"] }]
  },
  {
    path: "customization.enhancement.label",
    select: ["label"]
  },
  {
    path: "customization.flavour.default",
    select: ["name"]
  },
  {
    path: "customization.flavour.label",
    select: ["label"]
  },
  {
    path: "customization.flavour.options.flavour",
    select: ["name"]
  },
  {
    path: "customization.upgrade.default",
    select: ["label"]
  },
  {
    path: "customization.upgrade.label",
    select: ["label"]
  },
  {
    path: "customization.upgrade.options.upgrade",
    select: ["label"]
  },
  {
    path: "customization.uploadImage.label",
    select: ["label"]
  },
  {
    path: "customization.uploadText.label",
    select: ["label"]
  },

  // DELIVERY -----------------------------------------
  { path: "delivery.processingTime", select: ["hours", "label"] },
  { path: "delivery.slots.type", select: ["name", "price", "timeSlots"] },

  // PRICE -----------------------------------------
  { path: "price.cities.city", select: ["name"] }
];

// exports
export const fetchContents = (
  query?: Query<ContentDocument>,
  renderingStrategy?: "SSR" | "ISR"
) =>
  fetchDocuments(
    query || {},
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_REFRESH_INTERVAL }
  );

export const fetchContentBySlug = (
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
      populate: CONTENT_POPULATE
    },
    renderingStrategy
      ? renderingStrategy === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_REFRESH_INTERVAL }
      : RENDERING_STRATEGY === "SSR"
        ? { ssr: true }
        : { isr: true, revalidate: CONTENT_REFRESH_INTERVAL }
  );
