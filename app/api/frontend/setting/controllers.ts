// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Settings } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { type SettingDocument } from "@/common/types/documentation/settings/setting";

// controllers
export const getSetting = async (): Promise<SettingDocument | null> => {
  try {
    await connectDB();

    const document = await Settings.findOne();

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
