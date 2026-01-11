// constants
import { BASE_HOME_BG_COLOR } from "@/components/pages/(frontend)/Home/static/pallette";

// components
import FooterBottomLeft from "./BottomLeft";
import FooterBottomRight from "./BottomRight";
import FooterTopLeft from "./TopLeft";
import FooterTopRight from "./TopRight";
import WidthWrapper from "../../../wrapper/WidthWrapper";

// type
import { FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

export default function VendorFooterClient({
  footerSections
}: {
  footerSections: FooterSectionDocument[];
}) {
  return (
    <footer
      className={`absolute bottom-0 w-full bg-white z-10 overflow-hidden flex-none flex h-fit mt-10 ${BASE_HOME_BG_COLOR} px-3 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-8 md:pt-12 md:pb-8 1200:px-0 text-white`}
    >
      <WidthWrapper
        className={`z-20 left-1/2 -translate-x-1/2 relative w-device max-w-1200`}
      >
        <div className="grid grid-rows-[auto_auto] grid-cols-1 sm:grid-cols-[1fr_3fr] md:grid-cols-[1fr_4fr] gap-1.5 sm:gap-x-6">
          <FooterTopLeft />
          <FooterTopRight footerSections={footerSections} />
          <FooterBottomLeft />
          <FooterBottomRight />
        </div>
      </WidthWrapper>
    </footer>
  );
}
