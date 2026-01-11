import { cookies } from "next/headers";

const getCookie = ({ name }: { name: string }) => cookies().get(name)?.value;

const setCookie = (
  args: {
    name: string;
    value: string;
  } & (
    | {
        auth?: undefined;
      }
    | {
        auth: true;
        expiresIn: number;
      }
  )
) => {
  const { name, value, auth } = args;

  cookies().set(
    name,
    value,
    auth
      ? {
          httpOnly: true,
          maxAge: args.expiresIn,
          sameSite: "strict",
          path: "/",
          secure: process.env.NODE_ENV === "production"
        }
      : {}
  );
};

const cookie = {
  get: getCookie,
  set: setCookie
};

export default cookie;
