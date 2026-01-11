"use server";

import { ADMIN_VERIFIED } from "@/common/constants/cookieKeys";
import { cookies } from "next/headers";

export const isAdminLoggedin = async () => {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get(ADMIN_VERIFIED);

  if (!adminCookie || !adminCookie.value || adminCookie.value !== "true")
    return false;

  return true;
};
