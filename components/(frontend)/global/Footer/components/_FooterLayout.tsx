"use client";

// hooks
import { usePathname } from "next/navigation";

// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { BASE_HOME_BG_COLOR } from "@/components/pages/(frontend)/Home/static/pallette";

// components
import FooterBottomLeft from "./BottomLeft";
import FooterBottomRight from "./BottomRight";
import FooterTopLeft from "./TopLeft";
import FooterTopRight from "./TopRight";
import MaxWidthWrapper from "../../_MaxWidthWrapper/MaxWidthWrapper";

// type
import { FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

export default function FrontendFooterLayout({
  footerSections
}: {
  footerSections: FooterSectionDocument[];
}) {
  const currPath = usePathname();

  const isProductPage =
    currPath.includes(FRONTEND_LINKS.PRODUCT_PAGE) ||
    currPath.includes(FRONTEND_LINKS.SERVICE_PAGE);

  const TRANSPARENT_FOOTER_REGEX = /^\/([a-zA-Z]{2,}(?!\/).*)?$/;
  const transparentFooter = TRANSPARENT_FOOTER_REGEX.test(currPath);

  return (
    <footer
      className={`${currPath.includes("/vendor/registration") ? "absolute bottom-0 w-full bg-white z-10" : "relative"} overflow-hidden flex-none flex h-fit ${isProductPage ? BASE_HOME_BG_COLOR : transparentFooter ? BASE_HOME_BG_COLOR : `mt-10 ${BASE_HOME_BG_COLOR}`} px-3 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-8 md:pt-12 md:pb-8 1200:px-0 text-white`}
    >
      <MaxWidthWrapper
        className={`z-20 ${currPath.includes("/vendor/registration") ? "left-1/2 -translate-x-1/2 relative w-device max-w-1200" : ""}`}
      >
        <div className="grid grid-rows-[auto_auto] grid-cols-1 sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_4fr] gap-1.5 sm:gap-x-6">
          <FooterTopLeft />
          <FooterTopRight footerSections={footerSections} />
          <FooterBottomLeft />
          <FooterBottomRight />
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
