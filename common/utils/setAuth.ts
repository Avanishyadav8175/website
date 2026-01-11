"use server";
import { cookies } from "next/headers";
import { ADMIN_VERIFIED } from "../constants/cookieKeys";

export const setCookie = async () => {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_VERIFIED, "true");
};
