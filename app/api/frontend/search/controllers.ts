// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { AITags, Contents, ContentCategories, TrendingSearchKeywords } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
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

export const getAITags = async (): Promise<AITagDocument[] | null> => {
  try {
    await connectDB();

    const documents = await AITags.find({
      isActive: true
    }).select(["name"]);

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContentCategories = async (): Promise<
  ContentCategoryDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await ContentCategories.find({
      isActive: true
    }).select(["name", "slug"]);

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const getContents = async (): Promise<ContentDocument[] | null> => {
  try {
    await connectDB();

    const count = await Contents.countDocuments({
      isActive: true
    });

    if (!count) {
      return null;
    }

    const chunkCount = Math.ceil(count / CONTENT_PER_REQUEST);
    const promises = [];

    for (let i = 1; i <= chunkCount; i++) {
      promises.push(
        Contents.find({
          isActive: true
        })
          .sort({ name: 1 })
          .skip((i - 1) * CONTENT_PER_REQUEST)
          .limit(CONTENT_PER_REQUEST)
          .select(SELECT.content)
          .populate(POPULATE.content)
      );
    }

    const chunks = await Promise.all(promises);

    if (!chunks) {
      return null;
    }

    return chunks.flatMap((documents) => documents);
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
