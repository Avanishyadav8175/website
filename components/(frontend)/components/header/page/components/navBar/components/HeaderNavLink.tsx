// utils
import { memo } from "react";

// components
import Link from "next/link";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function HeaderNavLink({
  navLink: { _id, label, path }
}: {
  navLink: HeaderNavLinkDocument;
}) {
  return (
    <Link
      key={_id as string}
      href={path as string}
      prefetch={false}
      className="uppercase text-charcoal/90 text-sm font-medium transition-all duration-300 hover:text-sienna"
    >
      {label}
    </Link>
  );
}

export default memo(HeaderNavLink);
