// utils
import { memo } from "react";

// components
import BoxTheme from "@/components/(frontend)/content/theme/BoxTheme";

// types
import { HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import Link from "next/link";
import CustomFAQ from "./CustomFAQ";
import { PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { ColorDocument } from "@/common/types/documentation/presets/color";

function HamburgerNav({
  navLinks,
  close
}: {
  navLinks: HeaderNavLinkDocument[];
  close: () => void;
}) {
  if (navLinks?.length) {
    return (
      <BoxTheme className="!py-0 border border-black/10">
        {navLinks.map((navLink, index) =>
          navLink.path ? (
            <div
              key={index}
              className="border-t border-black/15 w-full flex items-center justify-stretch"
            >
              <Link
                href={navLink.path}
                className="h-14 flex items-center px-4 w-full"
              >
                {navLink.label}
              </Link>
            </div>
          ) : (
            <CustomFAQ
              key={index}
              q={navLink.label}
              a={
                <>
                  {navLink.sections?.map(({ heading, links }, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 py-2 px-1"
                    >
                      <span className="text-base font-medium text-charcoal-3 underline underline-offset-4 py-1.5">
                        {heading}
                      </span>
                      {links.map((link, index2) => (
                        <Link
                          key={index2}
                          onClick={close}
                          className="flex items-center justify-start gap-x-2.5 py-1"
                          href={link.path}
                        >
                          <span>{link.label}</span>
                          {link?.tag && (
                            <div
                              style={{
                                background: (
                                  (link?.tag as PromotionTagDocument)
                                    ?.color as ColorDocument
                                )?.hexCode
                              }}
                              className="text-white text-xs px-2.5 py-0.5 rounded-full"
                            >
                              {(link.tag as PromotionTagDocument)?.name ||
                                "SAEYUG"}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </>
              }
            />
          )
        )}
      </BoxTheme>
    );
  }

  return <></>;
}

export default memo(HamburgerNav);
