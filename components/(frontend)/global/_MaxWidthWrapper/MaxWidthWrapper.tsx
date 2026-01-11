"use client";
// import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { Children, ClassNameType } from "@/common/types/reactTypes";
// import { usePathname } from "next/navigation";

export default function MaxWidthWrapper({
  children,
  className
}: {
  children: Children;
  className?: ClassNameType;
}) {
  return (
    <div
      className={`min-[640px]:!px-5 w-device min-[1300px]:w-1200 relative left-1/2 -translate-x-1/2 ${className || ""}`}
    >
      {children}
    </div>
  );
}
