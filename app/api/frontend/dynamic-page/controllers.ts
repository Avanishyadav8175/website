// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { DynamicPages } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";
import { type MongooseErrorType } from "@/common/types/apiTypes";

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
    "price",
    "edible"
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
      select: ["name", "price", "timeSlots"]
    }
  ]
};

// controllers
export const getMeta = async ({
  slug
}: {
  slug: string;
}): Promise<DynamicPageDocument | null> => {
  try {
    await connectDB();

    const document = await DynamicPages.findOne({
      isActive: true,
      slug
    }).select(["seoMeta"]);

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getDynamicPage = async ({
  slug
}: {
  slug: string;
}): Promise<DynamicPageDocument | null> => {
  try {
    await connectDB();

    const documents = await DynamicPages.findOne({
      isActive: true,
      slug
    })
      .select(["name", "layouts"])
      .populate([
        {
          path: "layouts.layout.banner.images.desktop",
          select: SELECT.image,
          strictPopulate: false
        },
        {
          path: "layouts.layout.banner.images.mobile",
          select: SELECT.image,
          strictPopulate: false
        },
        {
          path: "layouts.layout.collage.images.image",
          select: SELECT.image,
          strictPopulate: false
        },
        {
          path: "layouts.layout.content",
          select: SELECT.content,
          populate: POPULATE.content,
          strictPopulate: false
        },
        {
          path: "layouts.layout.category.images.image",
          select: SELECT.image,
          strictPopulate: false
        }
      ]);

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getDynamicPageSlugs = async (): Promise<
  DynamicPageDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await DynamicPages.find({
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
