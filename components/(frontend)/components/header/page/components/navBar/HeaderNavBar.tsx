// utils
import { memo } from "react";

// components
import HeaderNavLink from "./components/HeaderNavLink";
import HeaderNavMenu from "./components/HeaderNavMenu";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function HeaderNavBar({ navLinks }: { navLinks: HeaderNavLinkDocument[] }) {
  return (
    <nav
      className={`relative max-lg:hidden py-0.5 flex items-center justify-center gap-7 *:px-2 *:py-1.5 border-t border-charcoal-3/5`}
    >
      {navLinks.map((navLink) =>
        navLink.path ? (
          <HeaderNavLink
            key={navLink._id as string}
            navLink={navLink}
          />
        ) : (
          <HeaderNavMenu
            key={navLink._id as string}
            navLink={navLink}
          />
        )
      )}
    </nav>
  );
}

export default memo(HeaderNavBar);
