// utils
import { memo } from "react";

// components
import HeaderNavMenuQuickLink from "./HeaderNavMenuQuickLink";
import HeaderNavMenuSection from "./HeaderNavMenuSection";
import { TooltipContent } from "@/components/ui/tooltip";

// types
import { ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

function HeaderNavMenuContent({
  sections,
  quickLinks
}: {
  sections?: HeaderNavLinkSectionDocument[];
  quickLinks?: ClickableImageDocument[];
}) {
  return (
    <div
      className="absolute -translate-x-1/2 left-1/2 min-w-fit p-2 grid items-start gap-3 rounded-2xl bg-ivory-1 outline-none border shadow-md"
      style={{
        gridTemplateColumns: `${Array.from({
          length: sections?.length || 0
        })
          .map((_) => "1fr")
          .join(" ")} auto`
      }}
    >
      {sections &&
        sections.length > 0 &&
        sections.map((section) => (
          <HeaderNavMenuSection
            key={section._id as string}
            section={section}
          />
        ))}
      <div className="grid grid-rows-2 grid-flow-col auto-cols-min gap-2.5">
        {quickLinks &&
          quickLinks.length > 0 &&
          quickLinks.map((quickLink) => (
            <HeaderNavMenuQuickLink
              key={quickLink._id as string}
              quickLink={quickLink}
            />
          ))}
      </div>
    </div>
  );
}

export default memo(HeaderNavMenuContent);
