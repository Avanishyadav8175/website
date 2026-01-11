import { sign, verify } from "jsonwebtoken";

export const generateJWT = <T extends object>({
  payload,
  secret,
  expiresIn
}: {
  payload: T;
  secret: string;
  expiresIn: number;
}) =>
  sign(payload, secret, {
    expiresIn
  });

export const extractJWT = <T>({
  token,
  secret
}: {
  token: string;
  secret: string;
}): T => verify(token, secret) as T;

const jwt = {
  extract: extractJWT,
  generate: generateJWT
};

export default jwt;
