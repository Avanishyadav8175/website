// utils
import { memo } from "react";

// components
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DrawerClose } from "@/components/ui/drawer";
import Link from "next/link";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function HamburgerNavLink({
  navLink: { _id, label, path }
}: {
  navLink: HeaderNavLinkDocument;
}) {
  return (
    <AccordionItem
      value={_id as string}
      asChild
    >
      <AccordionTrigger
        disabled
        className=" relative border-none text-base py-3.5 px-1 font-normal hover:no-underline  cursor-pointer transition-all duration-300"
      >
        <DrawerClose asChild>
          <Link
            href={path as string}
            prefetch={false}
            className="flex items-center justify-start gap-2.5"
          >
            <span>{label}</span>
          </Link>
        </DrawerClose>
        <div className="aspect-square bg-ivory-1 absolute right-1.5 top-1/2 -translate-y-1/2 w-4" />
      </AccordionTrigger>
    </AccordionItem>
  );
}

export default memo(HamburgerNavLink);
