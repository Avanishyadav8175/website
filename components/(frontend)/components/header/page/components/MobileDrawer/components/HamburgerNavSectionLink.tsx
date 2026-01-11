// utils
import { memo } from "react";

// components
import { DrawerClose } from "@/components/ui/drawer";
import Link from "next/link";

// types
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

function HamburgerNavSectionLink({
  link: { label, path, tag }
}: {
  link: HeaderNavLinkSectionLinkDocument;
}) {
  return (
    <DrawerClose asChild>
      <Link
        href={path}
        prefetch={false}
        className="text-sm text-charcoal-3/95 py-1 transition-all duration-300 hover:text-sienna flex items-center justify-start gap-3"
      >
        <span>{label}</span>
        {tag && (
          <span
            style={{
              background: ((tag as PromotionTagDocument).color as ColorDocument)
                .hexCode
            }}
            className={` text-white text-[12px] rounded-full px-2.5`}
          >
            {(tag as PromotionTagDocument).name}
          </span>
        )}
      </Link>
    </DrawerClose>
  );
}

export default memo(HamburgerNavSectionLink);
