// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { AITags, ContentCategories, TrendingSearchKeywords } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

// controllers
export const getAITags = async (): Promise<AITagDocument[] | null> => {
  try {
    await connectDB();

    const documents = await AITags.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $limit: 6
      },
      {
        $project: {
          _id: 1,
          name: 1
        }
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

export const getContentCategories = async (): Promise<
  ContentCategoryDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await ContentCategories.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          slug: 1
        }
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

export const getTrendingSearchKeywords = async (): Promise<
  TrendingSearchKeywordDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await TrendingSearchKeywords.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $project: {
          _id: 0,
          label: 1,
          path: 1
        }
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
