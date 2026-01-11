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
import { type PermanentRedirect } from "../types";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

export const getSubTopicRedirects = async (): Promise<PermanentRedirect[]> => {
  try {
    await connectDB();

    const documents = await SubTopics.find({
      isActive: true
    })
      .select(["slug", "redirectFrom"])
      .populate([
        {
          path: "category",
          select: ["slug"]
        },
        {
          path: "topic",
          select: ["slug"]
        }
      ])
      .sort({ name: 1 });

    if (!documents) {
      return [];
    }

    const redirects = documents.flatMap(
      ({ category, topic, slug, redirectFrom }) =>
        redirectFrom?.map(
          (source) =>
            ({
              source,
              destination: `/${(category as ContentCategoryDocument).slug}/${(topic as TopicDocument).slug}/${slug}`,
              permanent: true,
              statusCode: 301
            }) as PermanentRedirect
        ) || []
    );

    return redirects;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return [];
  }
};
