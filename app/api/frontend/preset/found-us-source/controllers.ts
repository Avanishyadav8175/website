// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { FoundUsSources } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type MongooseErrorType } from "@/common/types/apiTypes";

// controllers
export const getFoundUsSources = async (): Promise<
  FoundUsSourceDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await FoundUsSources.find({
      isActive: true
    })
      .select(["source"])
      .sort({ source: 1 });

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
