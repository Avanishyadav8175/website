// libraries
import {
  resendOTP,
  sendOTP,
  verifyOTP
  // @ts-ignore
} from "otpless-next-js-auth-sdk";

// DB connection
import connectDB from "@/db/mongoose/connection";

// utils
import { handleError } from "@/common/utils/api/error";
import { successData } from "@/common/utils/api/data";

// models
import MODELS from "@/db/mongoose/models";
const { Customers } = MODELS;

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { sendMailAlert } from "@/common/utils/api/sendMailAlert";

// constants
const OTP_LENGTH = 4;
const RESEND_OTP_TIME = 30;

// env variables
const OTPLESS_CLIENT_ID: string | undefined =
  process.env.OTPLESS_CLIENT_ID;
const OTPLESS_CLIENT_SECRET: string | undefined =
  process.env.OTPLESS_CLIENT_SECRET;

// controllers
export const identify = async ({ mobileNumber }: { mobileNumber: string }) => {
  try {
    await connectDB();

    const customer = await Customers.findOne({
      mobileNumber
    });

    if (customer) {
      return successData<"registered">("registered");
    } else {
      return successData<"not-registered">("not-registered");
    }
  } catch (error: any) {
    console.error(error);

    return handleError(error as MongooseErrorType);
  }
};

export const loginOrRegister = async (
  mobileNumber: string
): Promise<CustomerDocument | null> => {
  try {
    await connectDB();

    const customer = await Customers.findOne({
      mobileNumber
    });

    if (customer && customer?.status === "blocked") {
      return null;
    }

    if (!customer) {
      const newCustomer = new Customers({
        mobileNumber,
        createdBy: "Self",
        updatedBy: "Self"
      });

      const customer = await newCustomer.save();

      sendMailAlert({
        mobileNumber: customer.mobileNumber || null,
        mail: customer.mail || null
      });

      return customer;
    }

    return customer;
  } catch (error: any) {
    console.error(error);

    return null;
  }
};

export const send = async (mobileNumber: string): Promise<string> => {
  try {
    // OTPLESS query
    const response = await sendOTP(
      mobileNumber.split("-").join(""),
      null,
      "SMS",
      null,
      null,
      RESEND_OTP_TIME,
      OTP_LENGTH.toString(),
      OTPLESS_CLIENT_ID,
      OTPLESS_CLIENT_SECRET
    );

    if (!response.orderId) {
      // console.log({
      //   sendOTPErrorResponse: response
      // });

      return "";
    }

    return response.orderId;
  } catch (error: any) {
    console.error(error);

    return "";
  }
};

export const resend = async (orderId: string): Promise<string> => {
  try {
    // OTPLESS query
    const response = await resendOTP(
      orderId,
      OTPLESS_CLIENT_ID,
      OTPLESS_CLIENT_SECRET
    );

    if (!response.orderId) {
      // console.log({
      //   resendOTPErrorResponse: response
      // });

      return "";
    }

    return response.orderId;
  } catch (error: any) {
    console.error(error);

    return "";
  }
};

export const verify = async (
  mobileNumber: string,
  orderId: string,
  otp: string
): Promise<boolean | null> => {
  try {
    await connectDB();

    // OTPLESS query
    const response = await verifyOTP(
      null,
      mobileNumber.split("-").join(""),
      orderId,
      otp,
      OTPLESS_CLIENT_ID,
      OTPLESS_CLIENT_SECRET
    );

    return response.isOTPVerified;
  } catch (error: any) {
    console.error(error);

    return null;
  }
};
