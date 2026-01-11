// constants
import { DOMAIN } from "@/common/constants/domain";

// utils
import getAuthRequest from "@/common/utils/api/getAuthRequest";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";

// variables
const API_URL = "/api/auth/customer/mail";
const URL = DOMAIN ? `${DOMAIN}${API_URL}` : API_URL;

const { register, login, validate, logout } =
  getAuthRequest<CustomerDocument>(URL);

export const customerRegister = register;

export const customerLogin = login;

export const customerValidate = validate;

export const customerLogout = logout;
