// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { BlogArticles } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SitemapData } from "@/common/types/sitemap";

// controllers
export const getSitemapData = async (): Promise<SitemapData[] | null> => {
  try {
    await connectDB();

    const blogArticles = await BlogArticles.find({
      isActive: true
    })
      .select(["slug", "updatedAt"])
      .sort({ updatedAt: -1 });

    if (!blogArticles) {
      return null;
    }

    const sitemapData: SitemapData[] = blogArticles.map(
      ({ slug, updatedAt }) => ({
        slug: `blog/${slug}`,
        updatedAt
      })
    );

    return sitemapData;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
