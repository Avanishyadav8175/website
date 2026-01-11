// DB connection
import connectDB from "@/db/mongoose/connection";

// utils
import { successData } from "@/common/utils/api/data";
import { handleError } from "@/common/utils/api/error";

// models
import MODELS from "@/db/mongoose/models";
const { Customers } = MODELS;

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";

// controllers
export const identify = async ({ mail }: { mail: string }) => {
  try {
    await connectDB();

    const customer = await Customers.findOne({
      mail
    });

    if (customer) {
      return successData<{ status: "registered" }>({ status: "registered" });
    } else {
      return successData<{ status: "not-registered" }>({
        status: "not-registered"
      });
    }
  } catch (error: any) {
    console.error(error);

    return handleError(error as MongooseErrorType);
  }
};
