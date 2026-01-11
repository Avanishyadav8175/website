"use client";

// constants
import { CUSTOMER_DASHBOARD_TABS } from "./tabs/static/data";
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

export default function CustomerDashboard() {
  const {
    auth: {
      method: { onLogout }
    },
    profile: {
      data: { detail }
    }
  } = useAppStates();

  return (
    <>
      <section className="max-[1100px]:px-3.5 flex flex-col items-center justify-start text-charcoal-3/70 pt-14">
        <span>Welcome Back</span>
        <span className="font-medium text-4xl text-charcoal-3">
          {detail?.name || "User"}
        </span>

        <div className="grid grid-cols-2 gap-4 lg:gap-9 mt-14">
          {CUSTOMER_DASHBOARD_TABS.filter((_, index) => index > 0).map(
            ({ label, svg, link }, index) => (
              <Link
                // prefetch
                href={`${FRONTEND_LINKS.DASHBOARD}${link}`}
                key={index}
                className={`shadow-md border text-center max-lg:text-sm whitespace-nowrap p-6 pt-8 lg:p-8 lg:pt-10 flex flex-col items-center justify-center gap-4 aspect-[14/9] transition-all duration-300 rounded-2xl bg-ivory-1 hover:border-sienna/60 hover:text-sienna hover:bg-sienna-3/10 hover:shadow-crimson`}
              >
                <span className="scale-125 lg:scale-150">{svg}</span>
                <span className="text-md">{label}</span>
              </Link>
            )
          )}
          <div
            onClick={onLogout}
            className={`shadow-md shadow-red-100 border text-center max-lg:text-sm whitespace-nowrap p-6 pt-8 lg:p-8 lg:pt-10 flex flex-col items-center justify-center gap-4 aspect-[14/9] transition-all duration-300 rounded-2xl text-red-400 border-red-200 hover:border-red-100 hover:text-red-500/95 hover:bg-red-50/30 hover:shadow-red-200 cursor-pointer`}
          >
            <span className="scale-125 lg:scale-150">
              <LogOut
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>
            <span className="text-md">Logout</span>
          </div>
        </div>
      </section>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
