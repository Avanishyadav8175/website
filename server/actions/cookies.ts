"use server";

import { cookies } from "next/headers";

export const setCookie = async ({
  key,
  value
}: {
  key: string;
  value: string;
}) => {
  try {
    cookies().set(key, JSON.stringify(value));
  } catch (err) {}
};
