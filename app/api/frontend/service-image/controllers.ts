// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Settings } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type MongooseErrorType } from "@/common/types/apiTypes";

// controllers
export const getServiceImage = async (): Promise<ImageDocument | null> => {
  try {
    await connectDB();

    const documents = await Settings.find()
      .select(["serviceImage"])
      .populate([
        {
          path: "serviceImage",
          select: ["url"],
          strictPopulate: false
        }
      ]);

    if (!documents || !documents?.length) {
      return null;
    }

    const serviceImage = (documents[0].serviceImage as ImageDocument) || null;

    if (serviceImage) {
      serviceImage.alt = "";
    }

    return serviceImage;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};
