"use client";

// icons
import { LogOut } from "lucide-react";

// constants
import { CUSTOMER_DASHBOARD_TABS } from "./static/data";

// hooks
import { usePathname } from "next/navigation";

// components
import Link from "next/link";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

export default function FrontendDashboardSideTabs() {
  // hooks
  const currPath = usePathname();
  const {
    auth: {
      method: { onLogout }
    }
  } = useAppStates();

  // variables
  const currRoute = currPath.substring(currPath.lastIndexOf("/"));

  // event handlers
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="grid lg:grid-cols-[1fr_35px] max-lg:pt-4 lg:sticky lg:top-0">
      <div className="flex max-lg:items-center lg:flex-col justify-start gap-2.5 max-lg:px-3 py-1.5 lg:py-5 max-lg:overflow-auto scrollbar-hide">
        {CUSTOMER_DASHBOARD_TABS.map(({ label, svg, link }, index) => (
          <Link
            href={index === 0 ? link : `${FRONTEND_LINKS.DASHBOARD}${link}`}
            key={index}
            className={`py-2 lg:py-3 px-5 transition-all flex items-center justify-start gap-4 duration-300 rounded-full lg:rounded-xl max-lg:border ${currRoute === link ? "bg-sienna text-white max-lg:border-sienna" : "hover:bg-ash-1/30 max-lg:text-charcoal-3/60 text-charcoal-3 max-lg:border-ash max-lg:hover:border-sienna/80"}`}
          >
            {svg}
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        ))}
        <span className="max-lg:hidden h-px w-full bg-charcoal-3/15 my-2" />
        <div
          className={`max-lg:hidden py-3 px-5 cursor-pointer transition-all flex items-center justify-start gap-4 duration-300 rounded-xl text-red-500 hover:bg-red-100/90`}
          onClick={handleLogout}
        >
          <LogOut
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <span>{"Logout"}</span>
        </div>
      </div>

      <span className="flex items-stretch justify-center max-lg:hidden">
        <span className="w-px h-full bg-charcoal-3/15" />
      </span>
    </div>
  );
}
