// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Contents, Coupons, Vendors } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentSuggestionDocument } from "@/common/types/documentation/nestedDocuments/contentSuggestion";
import { type MongooseErrorType } from "@/common/types/apiTypes";

// constants
const SELECT = {
  contentBasic: [
    "name",
    "slug",
    // "category",
    "media.video",
    "availability.availableAt",
    "availability.limitAvailability",
    "detail.includes",
    "detail.excludes",
    "quality.rating.maxValue",
    "quality.rating.value",
    "quality.rating.count",
    "quality.review.personalized",
    "quality.review.count",
    "delivery.charge",
    "delivery.slots.timeSlots",
    "delivery.slots.price",
    "price.base.mrp",
    "price.base.price",
    "price.cities.city",
    "price.cities.mrp",
    "price.cities.price",
    "edible.isEdible",
    "edible.type",
    "seoMeta.description"
  ],
  contentSuggestion: [
    "type",
    "name",
    "slug",
    "quality.rating.value",
    "delivery.slots.timeSlots",
    "price.base.mrp",
    "price.base.price",
    "price.cities.city",
    "price.cities.mrp",
    "price.cities.price",
    "edible.isEdible",
    "edible.type"
  ],
  image: ["alt", "defaultAlt", "url"]
};

const POPULATE = {
  contentBasic: [
    {
      path: "category.primary",
      select: ["name", "slug"],
      populate: [
        {
          path: "charges.advancePayment",
          select: ["value"]
        }
      ]
    },
    {
      path: "media.primary",
      select: SELECT.image
    },
    {
      path: "media.gallery",
      select: SELECT.image
    },
    {
      path: "media.review",
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
      path: "detail.deliveryDetail",
      select: ["content"]
    },
    {
      path: "detail.careInfo",
      select: ["content"]
    },
    {
      path: "detail.cancellationPolicy",
      select: ["content"]
    },
    {
      path: "detail.faqGroup",
      select: ["faqs._id", "faqs.question", "faqs.answer"]
    },
    {
      path: "quality.review.group",
      select: ["reviews"],
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
  ],
  contentCustomization: [
    {
      path: "customization.enhancement.label",
      select: ["label"]
    },
    {
      path: "customization.enhancement.items.enhancement",
      select: ["label"],
      populate: [
        {
          path: "image",
          select: SELECT.image
        }
      ]
    },
    {
      path: "customization.upgrade.label",
      select: ["label"],
      strictPopulate: false
    },
    {
      path: "customization.upgrade.default",
      select: ["label"],
      strictPopulate: false
    },
    {
      path: "customization.upgrade.options.upgrade",
      select: ["label"],
      strictPopulate: false
    },
    {
      path: "customization.flavour.label",
      select: ["label"],
      strictPopulate: false
    },
    {
      path: "customization.flavour.default",
      select: ["name"],
      strictPopulate: false
    },
    {
      path: "customization.flavour.options.flavour",
      select: ["name"],
      strictPopulate: false
    },
    {
      path: "customization.balloonColor.label",
      select: ["label"],
      strictPopulate: false
    },
    {
      path: "customization.balloonColor.groups",
      select: ["name", "colors"],
      strictPopulate: false
    },
    {
      path: "customization.uploadText.label",
      select: ["label"],
      strictPopulate: false
    },
    {
      path: "customization.uploadImage.label",
      select: ["label"],
      strictPopulate: false
    }
  ],
  contentSuggestion: [
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
        // "name",
        // "price",
        "timeSlots._id",
        // "timeSlots.label",
        "timeSlots.startTime",
        "timeSlots.endTime"
      ]
    }
  ],
  addon: [
    {
      path: "addons.addon",
      select: [
        "category",
        "name",
        "price",
        "image",
        "edible.isEdible",
        "edible.type"
      ],
      populate: [
        {
          path: "category",
          select: ["name"]
        },
        {
          path: "image",
          select: SELECT.image
        }
      ]
    }
  ]
};

// utils
const getRandomElements = <T>({
  array,
  count
}: {
  array: T[];
  count: number;
}): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

// controllers
export const getMeta = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument | null> => {
  try {
    await connectDB();

    const document = await Contents.findOne({
      isActive: true,
      slug
    })
      .select(["seoMeta"])
      .populate([
        {
          path: "media.primary",
          select: ["url"]
        },
        {
          path: "media.gallery",
          select: ["url"]
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

export const getContentPageDetailsI = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument | null> => {
  try {
    await connectDB();

    const document = await Contents.findOne({
      isActive: true,
      slug
    })
      .select([...SELECT.contentBasic, "createdAt"])
      .populate(POPULATE.contentBasic);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentPageDetailsII = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument | null> => {
  try {
    await connectDB();

    const document = await Contents.findOne({
      isActive: true,
      slug
    }).select(["availability", "price"]);

    if (!document) {
      return null;
    }

    if (
      document?.availability?.availableAt === "cities" &&
      document?.availability?.limitAvailability
    ) {
      if (document?.price?.cities?.length) {
        document.availability.cities = document.price.cities.map(
          ({ city }) => city as string
        );
      } else {
        document.availability.cities = [];
      }
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentPageDetailsIII = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument | null> => {
  try {
    await connectDB();

    const document = await Contents.findOne({
      isActive: true,
      slug
    })
      .select([
        "customization.isCustomizable",
        "customization.enhancement.items._id",
        "customization.enhancement.items.price",
        "customization.upgrade.options._id",
        "customization.upgrade.options.price",
        "customization.flavour.options._id",
        "customization.flavour.options.price",
        "customization.uploadText.characterLimit",
        "customization.uploadImage.imageLimit",
        "addons.isPopular"
      ])
      .populate([...POPULATE.contentCustomization, ...POPULATE.addon]);

    if (!document) {
      return null;
    }

    const documentObj = document.toObject() as ContentDocument;

    documentObj.customization = documentObj.customization;
    documentObj.addons = documentObj.addons;

    return documentObj;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType).data.messages);

    return null;
  }
};

export const getContentPageDetailsIV = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument | null> => {
  try {
    await connectDB();

    const document = await Contents.findOne({
      isActive: true,
      slug
    })
      .select(["variants"])
      .populate([
        {
          path: "variants.label",
          select: ["label"]
        },
        {
          path: "variants.reference.reference",
          select: [
            "name",
            "slug",
            "price.base.mrp",
            "price.base.price",
            "price.cities.city",
            "price.cities.mrp",
            "price.cities.price"
          ],
          populate: [
            {
              path: "media.primary",
              select: SELECT.image
            }
          ],
          strictPopulate: false
        },
        {
          path: "variants.custom.unit",
          select: ["name", "abbr", "serves"],
          strictPopulate: false
        },
        {
          path: "variants.custom.variants",
          select: ["label", "price", "value"],
          populate: [
            {
              path: "image",
              select: SELECT.image
            }
          ],
          strictPopulate: false
        }
      ]);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType).data.messages);

    return null;
  }
};

export const getContentPageDetailsV = async ({
  slug
}: {
  slug: string;
}): Promise<ContentDocument | null> => {
  try {
    await connectDB();

    const document = await Contents.findOne({
      isActive: true,
      slug
    }).select(["category.primary", "tag.aiTags", "tag.relatedAITags"]);

    if (!document) {
      return null;
    }

    const [coupons, aiTagContents, relatedAITagContents, categoryContents] =
      await Promise.all([
        await Coupons.find({
          isActive: true,
          "valid.till": { $gt: new Date() },
          $or: [
            { applicableCategories: { $size: 0 } },
            { applicableCategories: document.category.primary }
          ]
        }).select([
          "type",
          "code",
          "description",
          "minimumOrderAmount",
          "limitPerCustomer",
          "discount.type",
          "discount.limit",
          "discount.percentage"
        ]),
        await Contents.find({
          slug: { $ne: slug },
          isActive: true,
          "tag.aiTags": { $in: document.tag?.aiTags }
        })
          .select(SELECT.contentSuggestion)
          .populate(POPULATE.contentSuggestion),
        await Contents.find({
          slug: { $ne: slug },
          isActive: true,
          "tag.aiTags": { $in: document.tag?.relatedAITags }
        })
          .select(SELECT.contentSuggestion)
          .populate(POPULATE.contentSuggestion),
        await Contents.find({
          slug: { $ne: slug },
          isActive: true,
          "category.primary": document.category.primary
        })
          .select(SELECT.contentSuggestion)
          .populate(POPULATE.contentSuggestion)
      ]);

    const shuffledAITagContents = getRandomElements({
      array: aiTagContents,
      count: 0
    });

    const filteredRelatedAITagContents = relatedAITagContents.filter(
      ({ _id }) =>
        !shuffledAITagContents.find(({ _id: id }) => String(id) === String(_id))
    );
    const shuffledRelatedAITagContents = getRandomElements({
      array: filteredRelatedAITagContents,
      count: 0
    });

    const filteredCategoryContents = categoryContents.filter(
      ({ _id }) =>
        !shuffledAITagContents.find(
          ({ _id: id }) => String(id) === String(_id)
        ) &&
        !shuffledRelatedAITagContents.find(
          ({ _id: id }) => String(id) === String(_id)
        )
    );
    const shuffledCategoryContents = getRandomElements({
      array: filteredCategoryContents,
      count: 16
    });

    const documentObj = document.toObject();

    documentObj._coupons = coupons;
    documentObj._suggestions = {
      aiTag: documentObj.tag?.aiTags?.length ? shuffledAITagContents : [],
      relatedAITag: documentObj.tag?.relatedAITags?.length
        ? shuffledRelatedAITagContents
        : [],
      category: shuffledCategoryContents
    } as ContentSuggestionDocument;

    return documentObj;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType).data.messages);

    return null;
  }
};
