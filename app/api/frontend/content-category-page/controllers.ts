// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { ContentCategories, Contents } = models;

// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// utils
import { getChromaticAberrationColor } from "@/components/(frontend)/category/utils/getChromaticAberrationColor";
import { handleError } from "@/common/utils/api/error";

// types
import { type CategoryPageDocument } from "@/common/types/documentation/nestedDocuments/categoryPage";
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

// constants
const SELECT = {
  content: [
    "type",
    "name",
    "slug",
    "media.primary",
    "delivery.slots.timeSlots",
    "quality.rating.value",
    "quality.rating.count",
    "price.base.mrp",
    "price.base.price",
    "price.cities.city",
    "price.cities.mrp",
    "price.cities.price",
    "edible.isEdible",
    "edible.type",
    "createdAt"
  ],
  image: ["alt", "defaultAlt", "url"]
};

const POPULATE = {
  content: [
    {
      path: "media.primary",
      select: SELECT.image
    },
    {
      path: "tag.promotionTag",
      select: ["name"],
      populate: [
        {
          path: "color",
          select: ["hexCode"]
        }
      ],
      strictPopulate: false
    },
    {
      path: "delivery.processingTime",
      select: ["hours"]
    },
    {
      path: "delivery.slots.type",
      select: [
        "name",
        "price",
        "timeSlots._id",
        "timeSlots.label",
        "timeSlots.startTime",
        "timeSlots.endTime"
      ]
    }
  ]
};

// controllers
export const getMeta = async ({
  slug
}: {
  slug: string;
}): Promise<ContentCategoryDocument | null> => {
  try {
    await connectDB();

    const document = await ContentCategories.findOne({
      isActive: true,
      slug
    })
      .select(["seo.meta"])
      .populate([
        {
          path: "media.icon",
          select: ["url"]
        },
        {
          path: "media.banner.images.desktop",
          select: ["url"],
          strictPopulate: false
        },
        {
          path: "media.banner.images.mobile",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentCategoryPageSlugs = async (): Promise<
  ContentCategoryDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await ContentCategories.find({
      isActive: true
    })
      .select(["slug"])
      .sort({
        slug: 1
      });

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentCategoryPageDetailsI = async ({
  slug
}: {
  slug: string;
}): Promise<ContentCategoryDocument | null> => {
  try {
    await connectDB();

    const document = await ContentCategories.findOne({
      isActive: true,
      slug
    })
      .select([
        "name",
        "slug",
        "relatedCategories.show",
        "relatedCategories.categories",
        "info.openIn",
        "info.heading",
        "info.topContent",
        "info.bottomContent",
        "media.banner.autoScroll",
        "media.banner.scrollInterval",
        "media.banner.loopInfinitely",
        "media.banner.showIndicators",
        "media.banner.images.path",
        "media.banner.type",
        "media.quickLinks._id",
        "media.quickLinks.label",
        "media.quickLinks.path",
        "seo.faqs._id",
        "seo.faqs.question",
        "seo.faqs.answer",
        "seo.meta.description",
        "personalizedReviews._id",
        "personalizedReviews.area",
        "personalizedReviews.review"
      ])
      .populate([
        {
          path: "relatedCategories.categories",
          select: ["name", "slug"],
          populate: [{ path: "media.icon", select: SELECT.image }],
          strictPopulate: false
        },
        {
          path: "media.banner.images.desktop",
          select: SELECT.image
        },
        {
          path: "media.banner.images.mobile",
          select: SELECT.image
        },
        {
          path: "media.quickLinks.image",
          select: SELECT.image,
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentCategoryPageDetailsII = async ({
  slug
}: {
  slug: string;
}): Promise<ContentCategoryDocument | null> => {
  try {
    await connectDB();

    const document = await ContentCategories.findOne({
      isActive: true,
      slug
    }).select(["_id"]);

    if (!document) {
      return null;
    }

    const [primaryContents, relatedContents] = await Promise.all([
      Contents.find({
        isActive: true,
        "category.primary": document._id
      })
        .select(SELECT.content)
        .populate(POPULATE.content),
      Contents.find({
        isActive: true,
        "category.related": document._id
      })
        .select(SELECT.content)
        .populate(POPULATE.content)
    ]);

    if (!primaryContents || !relatedContents) {
      return null;
    }

    const contents = [...primaryContents, ...relatedContents].sort(
      (a, b) =>
        (b.quality?.rating?.value || 0) * (b.quality?.rating?.count || 1) -
        (a.quality?.rating?.value || 0) * (a.quality?.rating?.count || 1)
    );

    const { totalRating, totalRatingCount } = contents.reduce(
      (acc, { quality }) => {
        if (quality?.rating?.value) {
          acc.totalRating += quality.rating.value;
        }
        if (quality?.rating?.count) {
          acc.totalRatingCount += quality.rating.count;
        }

        return acc;
      },
      { totalRating: 0, totalRatingCount: 0 }
    );

    const averageRating = (totalRating / contents.length).toFixed(1);

    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];

      let maxStartTime = "";

      (content.delivery!.slots as ContentDeliverySlotDocument[]).forEach(
        ({ type, timeSlots }) => {
          const deliveryType = type as DeliveryTypeDocument;

          deliveryType.timeSlots
            .filter(({ _id }) =>
              (timeSlots as string[]).includes(_id as string)
            )
            .forEach(({ startTime }) => {
              if (maxStartTime) {
                const [hours, minutes] = maxStartTime.split(":").map(Number);
                const [newHours, newMinutes] = startTime.split(":").map(Number);

                if (newHours === hours) {
                  if (newMinutes > minutes) {
                    maxStartTime = startTime;
                  }
                } else if (newHours > hours) {
                  maxStartTime = startTime;
                }
              } else {
                maxStartTime = startTime;
              }
            });
        }
      );

      const listItemData = {
        name: content.name,
        slug: `${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
        image: {
          alt: (content.media.primary as ImageDocument).alt || content.name,
          url: (content.media.primary as ImageDocument).url
        },
        price: content.price!.base.price,
        discount: Math.round(
          ((content.price!.base.mrp - content.price!.base.price) /
            content.price!.base.mrp) *
            100
        ),
        ratingValue: content.quality?.rating?.value,
        ratingCount: content.quality?.rating?.count,
        processingTime:
          (content.delivery?.processingTime as ProcessingTimeDocument)?.hours ||
          0,
        lastDeliverySlot: maxStartTime,
        edible:
          content.edible?.isEdible && content.edible.type !== "unspecified"
            ? content.edible.type
            : undefined,
        ...(content.tag?.promotionTag
          ? {
              tag: {
                label: (content.tag.promotionTag as PromotionTagDocument).name,
                backgroundColor: (
                  (content.tag.promotionTag as PromotionTagDocument)
                    .color as ColorDocument
                ).hexCode,
                textColor: getChromaticAberrationColor(
                  (
                    (content.tag.promotionTag as PromotionTagDocument)
                      .color as ColorDocument
                  ).hexCode
                )
              }
            }
          : {}),
        createdDate: content.createdAt
      } as ContentListItemDataDocument;

      content._listItemData = listItemData;
      // @ts-ignore
      content.type = undefined;
      // @ts-ignore
      content.name = undefined;
      // @ts-ignore
      content.slug = undefined;
      // @ts-ignore
      content.media = undefined;
      content.delivery = undefined;
      content.quality = undefined;
      content.tag = undefined;
      // @ts-ignore
      content.isActive = undefined;
      // @ts-ignore
      content.createdAt = undefined;
    }

    const { maxPrice, minPrice } = (() => {
      let minPrice = contents[0]._listItemData!.price;
      // @ts-ignore
      let maxPrice = contents[0]._listItemData!.price;

      for (let i = 1; i < contents.length; i++) {
        const price = contents[i]._listItemData!.price;

        if (minPrice > price) {
          minPrice = price;
        }

        if (maxPrice < price) {
          maxPrice = price;
        }
      }

      return { minPrice, maxPrice };
    })();

    const documentObj = document.toObject() as ContentCategoryDocument;

    documentObj._page = {
      contentCount: contents.length,
      maxPrice,
      minPrice,
      averageRating: Number(averageRating),
      ratingCount: totalRatingCount,
      contents: contents.slice(0, 32)
    } as unknown as CategoryPageDocument;

    return documentObj;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentCategoryContents = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument[] | null> => {
  try {
    await connectDB();

    const document = await ContentCategories.findOne({
      isActive: true,
      slug
    }).select(["_id"]);

    if (!document) {
      return null;
    }

    const [primaryContents, relatedContents] = await Promise.all([
      Contents.find({
        isActive: true,
        "category.primary": document._id
      })
        .select(SELECT.content)
        .populate(POPULATE.content),
      Contents.find({
        isActive: true,
        "category.related": document._id
      })
        .select(SELECT.content)
        .populate(POPULATE.content)
    ]);

    if (!(primaryContents && relatedContents)) {
      return null;
    }

    const contents = [...primaryContents, ...relatedContents].sort(
      (a, b) =>
        (b.quality?.rating?.value || 0) * (b.quality?.rating?.count || 1) -
        (a.quality?.rating?.value || 0) * (a.quality?.rating?.count || 1)
    );

    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];

      let maxStartTime = "";

      (content.delivery!.slots as ContentDeliverySlotDocument[]).forEach(
        ({ type, timeSlots }) => {
          const deliveryType = type as DeliveryTypeDocument;

          deliveryType.timeSlots
            .filter(({ _id }) =>
              (timeSlots as string[]).includes(_id as string)
            )
            .forEach(({ startTime }) => {
              if (maxStartTime) {
                const [hours, minutes] = maxStartTime.split(":").map(Number);
                const [newHours, newMinutes] = startTime.split(":").map(Number);

                if (newHours === hours) {
                  if (newMinutes > minutes) {
                    maxStartTime = startTime;
                  }
                } else if (newHours > hours) {
                  maxStartTime = startTime;
                }
              } else {
                maxStartTime = startTime;
              }
            });
        }
      );

      const listItemData = {
        name: content.name,
        slug: `${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
        image: {
          alt: (content.media.primary as ImageDocument).alt || content.name,
          url: (content.media.primary as ImageDocument).url
        },
        price: content.price!.base.price,
        discount: Math.round(
          ((content.price!.base.mrp - content.price!.base.price) /
            content.price!.base.mrp) *
            100
        ),
        ratingValue: content.quality?.rating?.value,
        ratingCount: content.quality?.rating?.count,
        processingTime:
          (content.delivery?.processingTime as ProcessingTimeDocument)?.hours ||
          0,
        lastDeliverySlot: maxStartTime,
        edible:
          content.edible?.isEdible && content.edible.type !== "unspecified"
            ? content.edible.type
            : undefined,
        ...(content.tag?.promotionTag
          ? {
              tag: {
                label: (content.tag.promotionTag as PromotionTagDocument).name,
                backgroundColor: (
                  (content.tag.promotionTag as PromotionTagDocument)
                    .color as ColorDocument
                ).hexCode,
                textColor: getChromaticAberrationColor(
                  (
                    (content.tag.promotionTag as PromotionTagDocument)
                      .color as ColorDocument
                  ).hexCode
                )
              }
            }
          : {}),
        createdDate: content.createdAt
      } as ContentListItemDataDocument;

      content._listItemData = listItemData;
      // @ts-ignore
      content.type = undefined;
      // @ts-ignore
      content.name = undefined;
      // @ts-ignore
      content.slug = undefined;
      // @ts-ignore
      content.media = undefined;
      content.delivery = undefined;
      content.quality = undefined;
      content.tag = undefined;
      // @ts-ignore
      content.isActive = undefined;
      // @ts-ignore
      content.createdAt = undefined;
    }

    return contents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
