// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { ContentCategories } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type PermanentRedirect } from "../types";

export const getContentCategoryRedirects = async (): Promise<
  PermanentRedirect[]
> => {
  try {
    await connectDB();

    const documents = await ContentCategories.find({
      isActive: true
    })
      .select(["slug", "redirectFrom"])
      .sort({ name: 1 });

    if (!documents) {
      return [];
    }

    const redirects = documents.flatMap(
      ({ slug, redirectFrom }) =>
        redirectFrom?.map(
          (source) =>
            ({
              source,
              destination: `/${slug}`,
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
