// utils
import cookie from "@/common/utils/cookie";
import jwt from "@/common/utils/jwt";

// types
type AuthTokenData = { id: string };

// env
const secret = process.env.JWT_SECRET || "";

export const setAuthCookie = ({
  name,
  payload,
  expiresIn
}: {
  name: string;
  payload: AuthTokenData;
  expiresIn: number;
}) => {
  const token = jwt.generate<AuthTokenData>({ payload, secret, expiresIn });

  cookie.set({ name, value: token, auth: true, expiresIn });
};

export const getAuthCookie = ({ name }: { name: string }) => {
  const token = cookie.get({ name });

  if (!token) {
    return undefined;
  }

  return jwt.extract<AuthTokenData>({ token, secret });
};

const authCookie = {
  get: getAuthCookie,
  set: setAuthCookie
};

export default authCookie;
