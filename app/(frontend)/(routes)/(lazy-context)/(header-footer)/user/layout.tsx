// constants
import { CANONICAL_LINK } from "@/common/constants/meta";

// types
import { type ReactNode } from "react";

export const metadata = {
  title: "Your Dashboard",
  description: `Manage your account, track orders, and explore your personalized dashboard for a smoother experience.`,
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  keywords: [],
  alternates: {
    canonical: CANONICAL_LINK
  }
};

export default async function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
