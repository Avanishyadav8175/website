// icons
import { ChevronRight } from "lucide-react";

// constants
import { CONTACT_LINKS } from "../constants/contactLinks";

// utils
import { memo } from "react";

// components
import BoxTheme from "@/components/(frontend)/content/theme/BoxTheme";
import Link from "next/link";

function HamburgerContact() {
  return (
    <section className="grid grid-cols-3 border-b border-black/15">
      {CONTACT_LINKS.map(({ label, link, svg, rightSide }, index) => (
        <Link
          href={link}
          prefetch={false}
          target="_blank"
          className={"flex flex-col items-center justify-center text-center text-sm gap-1.5 px-3 py-4 transition-all duration-300 hover:text-sienna" + (index > 0 && " border-l border-black/15")}
          key={index}
        >
          {svg}
          <span className="mt-1">{label}</span>
          {rightSide && (
            <span className="text-xs text-black/70">{rightSide.label}</span>
          )}
        </Link>
      ))}
    </section>
  );
}

export default memo(HamburgerContact);
