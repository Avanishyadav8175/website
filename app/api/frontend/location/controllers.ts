// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Cities } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type MongooseErrorType } from "@/common/types/apiTypes";

// controllers
export const getCities = async (): Promise<CityDocument[] | null> => {
  try {
    await connectDB();

    const documents = await Cities.find({
      isActive: true,
      isDeleted: { $ne: true }
    })
      .select(["name", "aliases"])
      .sort({ name: 1 })
      .lean()
      .exec();

    // Return empty array if no documents found (query succeeded but no results)
    // Return null only on error
    return (documents || []) as CityDocument[];
  } catch (error: any) {
    console.error("Error fetching cities:", handleError(error as MongooseErrorType));

    return null;
  }
};
