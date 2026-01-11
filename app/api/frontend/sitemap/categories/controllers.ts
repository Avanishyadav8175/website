// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { ContentCategories } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SitemapData } from "@/common/types/sitemap";

// controllers
export const getSitemapData = async (): Promise<SitemapData[] | null> => {
  try {
    await connectDB();

    const contentCategories = await ContentCategories.find({
      isActive: true
    })
      .select(["slug", "updatedAt"])
      .sort({ updatedAt: -1 });

    if (!contentCategories) {
      return null;
    }

    const sitemapData: SitemapData[] = contentCategories.map(
      ({ slug, updatedAt }) => ({
        slug,
        updatedAt
      })
    );

    return sitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
