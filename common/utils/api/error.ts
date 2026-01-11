// libraries
import mongoose from "mongoose";

// types
import {
  CastErrorType,
  GeneralErrorType,
  MongooseErrorType,
  ValidationErrorType,
  ValidatorErrorType,
  type ResponseType
} from "@/common/types/apiTypes";
import { ToastType } from "@/common/types/toast";

// utils
const getTypeLabel = (type: "Boolean" | "Number" | "String") => {
  switch (type) {
    case "Boolean":
      return "'true' or 'false'";

    case "Number":
      return "'number'";

    default:
      return "'text'";
  }
};

// error responses
export const badRequestErrorResponse: ResponseType<null> = {
  status: 404,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: "Bad Request"
      }
    ]
  }
};

export const notFoundErrorResponse: ResponseType<null> = {
  status: 404,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: "Not Found"
      }
    ]
  }
};

export const notUpdatedErrorResponse: ResponseType<boolean> = {
  status: 304,
  data: {
    data: false,
    messages: [
      {
        type: "error",
        message: "Not Updated"
      }
    ]
  }
};

export const serverErrorResponse: ResponseType<null> = {
  status: 500,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: "Server Error"
      }
    ]
  }
};

export const unauthenticatedErrorResponse: ResponseType<null> = {
  status: 401,
  data: {
    data: null,
    messages: []
  }
};

export const generateCastErrorResponse = (
  key: string,
  requiredType: "Boolean" | "Number" | "String"
): ResponseType<null> => ({
  status: 400,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: `'${key}' should be ${getTypeLabel(requiredType)}`
      }
    ]
  }
});

export const generateDuplicateKeyErrorResponse = (
  key: string,
  value: number | string
): ResponseType<null> => ({
  status: 409,
  data: {
    data: null,
    messages: [
      {
        type: "error",
        message: `${key} '${value}' already exists`
      }
    ]
  }
});

export const generateValidationErrorResponse = (errors: {
  [key: string]: CastErrorType | ValidatorErrorType;
}): ResponseType<null> => {
  const messages: ToastType[] = [];

  for (let key in errors) {
    if (errors[key] instanceof mongoose.Error.CastError) {
      const castError = errors[key] as CastErrorType;

      messages.push({
        type: "error",
        message: `'${key}' should be ${getTypeLabel(castError.kind)}`
      });
    } else if (errors[key] instanceof mongoose.Error.ValidatorError) {
      messages.push({
        type: "error",
        message: `'${key}' is required`
      });
    }
  }

  return {
    status: 400,
    data: {
      data: null,
      messages
    }
  };
};

// handlers
export const handleError = (error: MongooseErrorType): ResponseType<null> => {
  if (error instanceof mongoose.Error.CastError) {
    const castError = error as CastErrorType;

    const { stringValue, messageFormat, kind, value, path, valueType } = {
      stringValue: castError?.stringValue,
      messageFormat: castError?.messageFormat,
      kind: castError?.kind,
      value: castError?.value,
      path: castError?.path,
      valueType: castError?.valueType
    };

    return generateCastErrorResponse(path, kind);
  } else if (error instanceof mongoose.Error.ValidationError) {
    const validationError = error as ValidationErrorType;

    const errors = validationError?.errors;

    return generateValidationErrorResponse(errors);
  } else {
    const generalError = error as GeneralErrorType;

    const { index, code, errmsg, keyPattern, keyValue } = {
      index: generalError?.errorResponse?.index,
      code: generalError?.errorResponse?.code,
      errmsg: generalError?.errorResponse?.errmsg,
      keyPattern: generalError?.errorResponse?.keyPattern,
      keyValue: generalError?.errorResponse?.keyValue
    };

    switch (code) {
      case 11000: {
        const key = Object.keys(keyValue)[0];

        return generateDuplicateKeyErrorResponse(key, keyValue[key]);
      }

      default:
        return serverErrorResponse;
    }
  }
};
