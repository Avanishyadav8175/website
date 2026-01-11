// models
import MODELS from "@/db/mongoose/models";

// utils
import getAuthHandler from "@/common/utils/api/getAuthHandler";

// types
import {
  type CustomerDocument,
  type CustomerModel
} from "@/common/types/documentation/users/customer";
import { sendMailAlert } from "@/common/utils/api/sendMailAlert";

const checkStatus = (customer: CustomerDocument) =>
  customer.status === "active" ? customer : null;

const registrationAlert = async (customer: CustomerDocument) => {
  sendMailAlert({
    mobileNumber: customer.mobileNumber || null,
    mail: customer.mail || null
  });

  return customer;
};

const { register, login, validate, logout } = getAuthHandler<
  CustomerDocument,
  CustomerModel
>({ Model: MODELS.Customers, cookieName: "__user_auth__" });

export const handleCustomerRegister = register({
  responseDataMiddleware: registrationAlert
});
export const handleCustomerLogin = login({
  responseDataMiddleware: checkStatus
});
export const handleCustomerValidate = validate({
  responseDataMiddleware: checkStatus
});
export const handleCustomerLogout = logout();
