// utils
import { memo } from "react";

// components
import Link from "next/link";

// types
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

function HeaderNavMenuSection({
  section: { heading, links }
}: {
  section: HeaderNavLinkSectionDocument;
}) {
  return (
    <div className="flex flex-col justify-start gap-2 items-start *:whitespace-nowrap px-3 py-2">
      <span className="font-medium pb-1.5 text-charcoal-3 text-base">
        {heading}
      </span>
      {links.map(({ _id, label, path, tag }) => (
        <Link
          key={_id as string}
          href={path}
          prefetch={false}
          className="transition-all duration-300 cursor-pointer hover:text-sienna text-charcoal-3 w-full text-sm flex items-center justify-start gap-2"
        >
          <span>{label}</span>
          {tag && (
            <span
              style={{
                background: (
                  (tag as PromotionTagDocument).color as ColorDocument
                ).hexCode
              }}
              className={`text-white text-[9px] uppercase leading-none tracking-wide rounded-full px-2.5 py-1`}
            >
              {(tag as PromotionTagDocument).name}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

export default memo(HeaderNavMenuSection);
