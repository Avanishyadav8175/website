// utils
import { memo } from "react";

// components
import FooterBottomLeft from "./BottomLeft";
import FooterBottomRight from "./BottomRight";
import FooterTopLeft from "./TopLeft";
import FooterTopRight from "./TopRight";
import WidthWrapper from "../../../wrapper/WidthWrapper";

// type
import { FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

async function FooterClient({
  footerSections
}: {
  footerSections: FooterSectionDocument[];
}) {
  return (
    <footer
      className={`relative overflow-hidden flex-none flex h-fit bg-ivory-1 px-3 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-8 border-t border-charcoal-3/10 md:pb-8 1200:px-0 text-white lg:-mb-44`}
    >
      <WidthWrapper className={`z-20`}>
        <div className="grid grid-rows-[auto_auto] grid-cols-1 sm:grid-cols-[3fr_1fr] md:grid-cols-[4fr_1fr] sm:gap-x-6">
          <FooterTopRight footerSections={footerSections} />
          <FooterTopLeft />
          <FooterBottomRight />
          <FooterBottomLeft />
        </div>
      </WidthWrapper>
    </footer>
  );
}

export default memo(FooterClient);
