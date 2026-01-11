// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Contents } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type PermanentRedirect } from "../types";

export const getServiceRedirects = async (): Promise<PermanentRedirect[]> => {
  try {
    await connectDB();

    const documents = await Contents.find({
      isActive: true,
      type: "service"
    })
      .select(["slug", "redirectFrom"])
      .sort({ name: 1 });

    if (!documents) {
      return [];
    }

    const redirects = documents
      .filter(({ redirectFrom }) => redirectFrom)
      .map(
        ({ slug, redirectFrom: source }) =>
          ({
            source,
            destination: `/s/${slug}`,
            permanent: true,
            statusCode: 301
          }) as PermanentRedirect
      );

    return redirects;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return [];
  }
};
