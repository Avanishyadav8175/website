// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { AITags, ContentCategories, TrendingSearchKeywords } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

// constants
const CONTENT_PER_REQUEST = 750;

const SELECT = {
  content: [
    "type",
    "name",
    "slug",
    "media.primary",
    "delivery.slots.timeSlots",
    "quality.rating.value",
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
export const getTrendingSearchKeywords = async (): Promise<
  TrendingSearchKeywordDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await TrendingSearchKeywords.find({
      isActive: true
    }).select(["label", "path"]);

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getAITags = async (): Promise<string[] | null> => {
  try {
    await connectDB();

    const documents = await AITags.find({
      isActive: true
    })
      .select("name")
      .lean()
      .limit(6)
      .exec();

    if (!documents) {
      return null;
    }

    return documents.map(({ name }) => name);
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentCategories = async (): Promise<string[][] | null> => {
  try {
    await connectDB();

    const documents = await ContentCategories.find({
      isActive: true
    })
      .select(["name", "slug"])
      .lean()
      .exec();

    if (!documents) {
      return null;
    }

    return documents.map(({ name, slug }) => [name, slug]);
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
