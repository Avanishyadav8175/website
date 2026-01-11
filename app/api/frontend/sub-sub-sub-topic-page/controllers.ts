// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { ContentCategories, Topics, SubTopics, SubSubTopics, SubSubSubTopics } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SubSubSubTopicDocument } from "@/common/types/documentation/pages/subSubSubTopic";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { ColorDocument } from "@/common/types/documentation/presets/color";
import { getChromaticAberrationColor } from "@/components/(frontend)/category/utils/getChromaticAberrationColor";
import { ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";
import { CategoryPageDocument } from "@/common/types/documentation/nestedDocuments/categoryPage";
import { getContentPrice } from "@/components/(frontend)/category/utils/getContentPrice";
import { CityDocument } from "@/common/types/documentation/presets/city";

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
    "isActive",
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
export const getSubSubSubTopicMeta = async ({
  categorySlug,
  topicSlug,
  subTopicSlug,
  subSubTopicSlug,
  subSubSubTopicSlug
}: {
  categorySlug: string;
  topicSlug: string;
  subTopicSlug: string;
  subSubTopicSlug: string;
  subSubSubTopicSlug: string;
}): Promise<SubSubSubTopicDocument | null> => {
  try {
    await connectDB();

    const category = await ContentCategories.findOne({
      isActive: true,
      slug: categorySlug
    }).select(["_id"]);

    if (!category) {
      return null;
    }

    const topic = await Topics.findOne({
      isActive: true,
      category: category._id,
      slug: topicSlug
    }).select(["_id"]);

    if (!topic) {
      return null;
    }

    const subtopic = await SubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      slug: subTopicSlug
    }).select(["_id"]);

    if (!subtopic) {
      return null;
    }

    const subSubTopic = await SubSubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      subTopic: subtopic._id,
      slug: subSubTopicSlug
    }).select(["_id"]);

    if (!subSubTopic) {
      return null;
    }

    const subSubSubTopic = await SubSubSubTopics.findOne({
      isActive: true,
      topic: topic._id,
      subtopic: subtopic._id,
      subSubTopic: subSubTopic._id,
      slug: subSubSubTopicSlug
    })
      .select(["seo.meta"])
      .populate([
        {
          path: "category",
          select: ["_id"],
          populate: [
            {
              path: "media.icon",
              select: ["url"]
            }
          ]
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

    if (!subSubSubTopic) {
      return null;
    }

    return subSubSubTopic;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getSubSubSubTopicPageSlugs = async (): Promise<
  SubSubSubTopicDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await SubSubSubTopics.find({
      isActive: true
    })
      .select(["slug"])
      .populate([
        {
          path: "category",
          select: ["slug"]
        },
        {
          path: "topic",
          select: ["slug"]
        },
        {
          path: "subTopic",
          select: ["slug"]
        },
        {
          path: "subSubTopic",
          select: ["slug"]
        }
      ])
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

export const getSubSubSubTopicPageDetailsI = async ({
  categorySlug,
  topicSlug,
  subTopicSlug,
  subSubTopicSlug,
  subSubSubTopicSlug
}: {
  categorySlug: string;
  topicSlug: string;
  subTopicSlug: string;
  subSubTopicSlug: string;
  subSubSubTopicSlug: string;
}): Promise<SubSubSubTopicDocument | null> => {
  try {
    await connectDB();

    const category = await ContentCategories.findOne({
      isActive: true,
      slug: categorySlug
    }).select(["_id"]);

    if (!category) {
      return null;
    }

    const topic = await Topics.findOne({
      isActive: true,
      category: category._id,
      slug: topicSlug
    }).select(["_id"]);

    if (!topic) {
      return null;
    }

    const subtopic = await SubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      slug: subTopicSlug
    }).select(["_id"]);

    if (!subtopic) {
      return null;
    }

    const subSubTopic = await SubSubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      subTopic: subtopic._id,
      slug: subSubTopicSlug
    }).select(["_id"]);

    if (!subSubTopic) {
      return null;
    }

    const document = await SubSubSubTopics.findOne({
      isActive: true,
      topic: topic._id,
      subtopic: subtopic._id,
      subSubTopic: subSubTopic._id,
      slug: subSubSubTopicSlug
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
          path: "category",
          select: ["name", "slug"]
        },
        {
          path: "topic",
          select: ["name", "slug"]
        },
        {
          path: "subTopic",
          select: ["name", "slug"]
        },
        {
          path: "subSubTopic",
          select: ["name", "slug"]
        },
        {
          path: "city",
          select: ["name", "aliases"]
        },
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

export const getSubSubSubTopicPageDetailsII = async ({
  categorySlug,
  topicSlug,
  subTopicSlug,
  subSubTopicSlug,
  subSubSubTopicSlug
}: {
  categorySlug: string;
  topicSlug: string;
  subTopicSlug: string;
  subSubTopicSlug: string;
  subSubSubTopicSlug: string;
}): Promise<SubSubSubTopicDocument | null> => {
  try {
    await connectDB();

    const category = await ContentCategories.findOne({
      isActive: true,
      slug: categorySlug
    }).select(["_id"]);

    if (!category) {
      return null;
    }

    const topic = await Topics.findOne({
      isActive: true,
      category: category._id,
      slug: topicSlug
    }).select(["_id"]);

    if (!topic) {
      return null;
    }

    const subtopic = await SubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      slug: subTopicSlug
    }).select(["_id"]);

    if (!subtopic) {
      return null;
    }

    const subSubTopic = await SubSubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      subTopic: subtopic._id,
      slug: subSubTopicSlug
    }).select(["_id"]);

    if (!subSubTopic) {
      return null;
    }

    const document = await SubSubSubTopics.findOne({
      isActive: true,
      topic: topic._id,
      subtopic: subtopic._id,
      subSubTopic: subSubTopic._id,
      slug: subSubSubTopicSlug
    })
      .select(["_id"])
      .populate([
        {
          path: "contents",
          select: SELECT.content,
          populate: POPULATE.content
        },
        {
          path: "city",
          select: ["_id", "name"],
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    const contents = [...((document.contents as ContentDocument[]) || [])]
      .filter(({ isActive }) => isActive)
      .sort(
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

      const { price, mrp } = getContentPrice({
        price: content.price!,
        city: document.city ? (document.city as CityDocument) : null
      });

      const listItemData = {
        name: content.name,
        slug: `${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
        image: {
          alt: (content.media.primary as ImageDocument).alt || content.name,
          url: (content.media.primary as ImageDocument).url
        },
        price: price,
        discount: Math.round(((mrp - price) / mrp) * 100),
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

    const documentObj = document.toObject() as SubSubSubTopicDocument;

    documentObj._page = {
      contentCount: contents.length,
      maxPrice,
      minPrice,
      averageRating: Number(averageRating),
      ratingCount: totalRatingCount,
      defaultCityId: (document.city as CityDocument)?._id,
      contents: contents.slice(0, 32)
    } as unknown as CategoryPageDocument;

    return documentObj;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getSubSubSubTopicPageContents = async ({
  categorySlug,
  topicSlug,
  subTopicSlug,
  subSubTopicSlug,
  subSubSubTopicSlug
}: {
  categorySlug: string;
  topicSlug: string;
  subTopicSlug: string;
  subSubTopicSlug: string;
  subSubSubTopicSlug: string;
}): Promise<ContentDocument[] | null> => {
  try {
    await connectDB();

    const category = await ContentCategories.findOne({
      isActive: true,
      slug: categorySlug
    }).select(["_id"]);

    if (!category) {
      return null;
    }

    const topic = await Topics.findOne({
      isActive: true,
      category: category._id,
      slug: topicSlug
    }).select(["_id"]);

    if (!topic) {
      return null;
    }

    const subtopic = await SubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      slug: subTopicSlug
    }).select(["_id"]);

    if (!subtopic) {
      return null;
    }

    const subSubTopic = await SubSubTopics.findOne({
      isActive: true,
      category: category._id,
      topic: topic._id,
      subTopic: subtopic._id,
      slug: subSubTopicSlug
    }).select(["_id"]);

    if (!subSubTopic) {
      return null;
    }

    const document = await SubSubSubTopics.findOne({
      isActive: true,
      topic: topic._id,
      subtopic: subtopic._id,
      subSubTopic: subSubTopic._id,
      slug: subSubSubTopicSlug
    })
      .select(["_id"])
      .populate([
        {
          path: "contents",
          select: SELECT.content,
          populate: POPULATE.content
        },
        {
          path: "city",
          select: ["_id", "name"],
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    const contents = [...((document.contents as ContentDocument[]) || [])].sort(
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

      const { price, mrp } = getContentPrice({
        price: content.price!,
        city: document.city ? (document.city as CityDocument) : null
      });

      const listItemData = {
        name: content.name,
        slug: `${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
        image: {
          alt: (content.media.primary as ImageDocument).alt || content.name,
          url: (content.media.primary as ImageDocument).url
        },
        price: price,
        discount: Math.round(((mrp - price) / mrp) * 100),
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
      content.createdAt = undefined;
    }

    return contents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
