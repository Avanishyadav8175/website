// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { FooterSections } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { type MongooseErrorType } from "@/common/types/apiTypes";

// controllers
export const getFooterSections = async (): Promise<
  FooterSectionDocument[] | null
> => {
  try {
    await connectDB();

    const documents = await FooterSections.find({
      isActive: true
    })
      .select(["heading", "path", "links"])
      .sort({
        order: 1
      });

    if (!documents) {
      return null;
    }

    return documents;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
