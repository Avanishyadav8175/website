"use client";

// icons
import { UserRoundIcon } from "lucide-react";

// utils
import { lazy, memo } from "react";

// components
const LazyHeaderUserContent = lazy(() => import("./HeaderUserContent"));
import { Suspense } from "react";

function HeaderUser() {
  return (
    <Suspense
      fallback={
        <section className="relative sm:min-w-[52px] flex flex-col items-center justify-center gap-1 text-xs text-charcoal-3 sm:px-1 transition-colors duration-300 cursor-pointer hover:text-sienna">
          <UserRoundIcon
            strokeWidth={1}
            width={24}
            height={24}
          />
          <span className="max-sm:hidden">Guest</span>
        </section>
      }
    >
      {/* <LazyHeaderUserContent /> */}
    </Suspense>
  );
}

export default memo(HeaderUser);
