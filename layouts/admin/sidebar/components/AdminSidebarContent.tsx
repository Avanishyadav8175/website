"use client";

// hooks
import { useState } from "react";
import { usePathname } from "next/navigation";

// hooks
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";

// components
import AdminSidebarFooter from "./AdminSidebarFooter";
import AdminSidebarHeader from "./AdminSidebarHeader";
import AdminSidebarSection from "./AdminSidebarSection";
import { SIDEBAR_SECTIONS } from "@/common/routes/admin/sidebarSections";
import { ROOT_ADMIN_ROUTE } from "@/common/routes/admin/staticLinks";

// types

export function AdminSidebarContent({ isMobile }: { isMobile?: boolean }) {
  const {
    data: { userName, authorizedSections },
    method: { logout }
  } = useAdminAuth();

  const [isLocked, setIsLocked] = useState(true);

  const currPath = usePathname();

  return (
    <div
      className={`group ${isLocked ? "w-[300px]" : "w-[68px]"} hover:w-[300px] transition-all duration-300 min-w-[calc(100dvw_-_28px)] sm:min-w-[68px] sm:px-3 sm:pb-2 sm:border-r-[1.5px] sm:border-ash flex flex-col justify-between gap-0 overflow-x-hidden *:flex *:flex-col *:items-start sm:*:gap-1`}
    >
      <div className="sm:pt-2 pb-4 justify-start overflow-y-scroll scrollbar-hide">
        <AdminSidebarHeader
          isLocked={isLocked}
          isMobile={isMobile}
          toggleIsLocked={() => { }}
        />
        {SIDEBAR_SECTIONS &&
          SIDEBAR_SECTIONS.map((section, i) => {
            const isCurrPath: boolean =
              "path" in section
                ? section.path === ROOT_ADMIN_ROUTE
                  ? currPath === ROOT_ADMIN_ROUTE
                    ? true
                    : false
                  : currPath.includes(section.path)
                : false;

            return (
              <AdminSidebarSection
                key={i}
                section={section}
                currPath={currPath}
                isLocked={isLocked}
                isMobile={isMobile}
                isActive={isCurrPath}
              />
            );
          })}
      </div>
      <AdminSidebarFooter
        isLocked={isLocked}
        isMobile={isMobile}
        userName={userName}
        logout={logout}
      />
    </div>
  );
}
