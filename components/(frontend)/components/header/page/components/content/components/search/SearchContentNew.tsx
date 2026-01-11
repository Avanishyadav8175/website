"use client";

// icons
import { Search } from "lucide-react";

// utils
import { lazy } from "react";

// hooks
import { useState } from "react";

// components
const LazySearchContentDrawer = lazy(() => import("./SearchContentDrawer"));
const LazySearchContentUI = lazy(() => import("./SearchContentUI"));
import { Suspense } from "react";

// types
import { type SearchBarInitialContentsType } from "../../../../Header";

export default function SearchContentNew({
  searchResults
}: {
  searchResults: SearchBarInitialContentsType | null;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <div
        className={`sm:hidden relative min-w-[52px] max-sm:min-w-[45px] flex flex-col items-center justify-center gap-1 text-xs text-charcoal-3 sm:px-1 transition-colors duration-300 cursor-pointer hover:text-sienna`}
        onClick={() => {
          setIsFocused(true);
        }}
      >
        <Search
          strokeWidth={1}
          width={24}
          height={24}
        />
        <span className="max-sm:hidden">{"Search"}</span>
      </div>
      <section
        className={`z-[999] absolute max-sm:hidden sm:w-[350px] -translate-x-[calc(50%_-_28px)] outline-none text-charcoal-3/90 backdrop-blur-md bg-ivory/80 rounded-xl w-fit py-2.5 px-4 text-base border border-charcoal-3/10 shadow-sm transition-all duration-300`}
      >
        <Suspense
          fallback={
            <section className="flex items-center justify-start sm:justify-between gap-4 bg-ivory-2 text-charcoal-3/80 sm:bg-transparent max-sm:px-3.5 max-sm:py-3 max-sm:rounded-2xl transition-all duration-300 focus:bg-charcoal-3/10 max-sm:mb-1.5">
              <Search
                width={20}
                height={20}
              />
              <input
                className="w-[calc(100dvw_-_50px)] sm:w-[320px] outline-none focus:outline-none bg-transparent text-base "
                autoComplete="off"
                type="text"
                name="search"
                placeholder="Search here"
              />
            </section>
          }
        >
          <LazySearchContentUI
            isFocused={isFocused}
            searchResults={searchResults}
            onChangeIsFocused={setIsFocused}
          />
        </Suspense>
      </section>
      {/* <Suspense>
        <LazySearchContentDrawer
          isFocused={isFocused}
          searchResults={searchResults}
          onChangeIsFocused={setIsFocused}
        />
      </Suspense> */}
    </>
  );
}
