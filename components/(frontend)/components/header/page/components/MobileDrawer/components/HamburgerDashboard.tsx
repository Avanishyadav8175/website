// constants
import { DASHBOARD_LINKS } from "../constants/dashboardLinks";

// utils
import { memo } from "react";

// components
import BoxTheme from "@/components/(frontend)/content/theme/BoxTheme";
import Link from "next/link";

function HamburgerDashboard({
  isAuthenticated,
  onClose
}: {
  isAuthenticated: boolean;
  onClose: () => void;
}) {
  if (isAuthenticated) {
    return (
      <section className="mb-4 gap-2 grid grid-cols-2">
        {DASHBOARD_LINKS.map(({ label, link, svg }, index) => (
          <Link
            key={index}
            href={link}
            prefetch={false}
            className="flex justify-center flex-col text-sm text-center border rounded-xl shadow-sm items-center gap-x-3 px-3 py-4 gap-1.5 transition-all duration-300 hover:text-sienna bg-white"
            onClick={onClose}
          >
            {svg}
            <span>{label}</span>
          </Link>
        ))}
      </section>
    );
  }

  return <></>;
}

export default memo(HamburgerDashboard);
