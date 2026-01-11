// utils
import { lazy, memo, useState } from "react";

// components
const LazyHeaderNavMenuContent = lazy(() => import("./HeaderNavMenuContent"));
import { Suspense } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

function HeaderNavMenu({
  navLink: { label, sections, quickLinks }
}: {
  navLink: HeaderNavLinkDocument;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <div
        onClick={() => setOpen(true)}
        className="font-medium text-[15px] text-charcoal/90 transition-all duration-300 hover:text-sienna cursor-pointer"
      >
        {label}
      </div>
      <div className={`transition-all duration-150 ${!open ? "opacity-0 -translate-y-5 pointer-events-none" : "opacity-100"}`}>
        <Suspense>
          <LazyHeaderNavMenuContent
            sections={sections}
            quickLinks={quickLinks}
          />
        </Suspense>
      </div>
    </section>
  );

  return (
    <TooltipProvider
      delayDuration={50}
      skipDelayDuration={0}
    >
      <Tooltip defaultOpen={false} delayDuration={50} open={open} onOpenChange={setOpen}>
        <TooltipTrigger onClick={() => setOpen((prev) => !prev)} className="font-medium text-[15px] text-charcoal/90 transition-all duration-300 hover:text-sienna cursor-pointer">
          {label}
        </TooltipTrigger>
        <Suspense>
          <LazyHeaderNavMenuContent
            sections={sections}
            quickLinks={quickLinks}
          />
        </Suspense>
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(HeaderNavMenu);
