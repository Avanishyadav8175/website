// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Topics } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SitemapData } from "@/common/types/sitemap";

// controllers
export const getSitemapData = async (): Promise<SitemapData[] | null> => {
  try {
    await connectDB();

    const topics = await Topics.find({
      isActive: true
    })
      .select(["slug", "updatedAt"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "category",
          select: ["slug"]
        }
      ]);

    if (!topics) {
      return null;
    }

    const sitemapData: SitemapData[] = topics.map(
      ({ category, slug, updatedAt }) => ({
        slug: `${(category as ContentCategoryDocument).slug}/${slug}`,
        updatedAt
      })
    );

    return sitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
