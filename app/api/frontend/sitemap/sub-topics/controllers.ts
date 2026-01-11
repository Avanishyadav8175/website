// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { SubTopics } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SitemapData } from "@/common/types/sitemap";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

// controllers
export const getSitemapData = async (): Promise<SitemapData[] | null> => {
  try {
    await connectDB();

    const subTopics = await SubTopics.find({
      isActive: true
    })
      .select(["slug", "updatedAt"])
      .sort({ updatedAt: -1 })
      .populate([
        {
          path: "category",
          select: ["slug"]
        },
        {
          path: "topic",
          select: ["slug"]
        }
      ]);

    if (!subTopics) {
      return null;
    }

    const sitemapData: SitemapData[] = subTopics.map(
      ({ category, topic, slug, updatedAt }) => ({
        slug: `${(category as ContentCategoryDocument).slug}/${(topic as TopicDocument).slug}/${slug}`,
        updatedAt
      })
    );

    return sitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
