import { type ReactNode } from "react";

export type AuthMethod = "mail" | "mobile" | "whatsapp" | "google";
export type AuthMethodData = {
  name: AuthMethod;
  label: string;
  icon: ReactNode;
};
