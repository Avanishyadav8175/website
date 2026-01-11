// DB connection
import connectDB from "@/db/mongoose/connection";

// utils
import { successData } from "@/common/utils/api/data";
import {
  handleError,
  unauthenticatedErrorResponse
} from "@/common/utils/api/error";

// models
import MODELS from "@/db/mongoose/models";
const { Customers } = MODELS;

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";
// import { sendMailAlert } from "@/common/utils/api/sendMailAlert";

// env variables
const REDIRECT_DOMAIN: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_DOMAIN;
const GOOGLE_CLIENT_ID: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;

// controllers
export const verify = async (code: string) => {
  try {
    await connectDB();

    // google
    const token = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": XApiKey
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: GOOGLE_CLIENT_ID as string,
        client_secret: GOOGLE_CLIENT_SECRET as string,
        redirect_uri: REDIRECT_DOMAIN as string
      })
    }).then((response) => response.json());

    if (!token) {
      return null;
    }

    const data = await fetch(
      `https://openidconnect.googleapis.com/v1/userinfo?access_token=${token.access_token}`,
      {
        headers: {
          "x-api-key": XApiKey
        }
      }
    ).then((res) => res.json());

    if (!data || !data?.email) {
      return null;
    }

    const customer = await Customers.findOne({
      mail: data?.email
    });

    if (customer && customer?.status === "blocked") {
      return unauthenticatedErrorResponse;
    }

    if (!customer) {
      const newCustomer = new Customers({
        name: data?.name,
        mail: data?.email,
        createdBy: data?.name || "",
        updatedBy: data?.name || ""
      });

      const customer = await newCustomer.save();

      // sendMailAlert({
      //   mobileNumber: customer.mobileNumber || null,
      //   mail: customer.mail || null
      // });

      return successData<CustomerDocument>(customer);
    }

    return successData<CustomerDocument>(customer);
  } catch (error: any) {
    console.error(error);

    return handleError(error as MongooseErrorType);
  }
};
