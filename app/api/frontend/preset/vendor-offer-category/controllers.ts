// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { VendorOfferCategories } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

// controllers
export const getVendorOfferCategories = async (): Promise<
  VendorOfferCategoryDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await VendorOfferCategories.find({
      isActive: true
    })
      .select(["name"])
      .sort({ name: 1 });

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
