"use client";

// icons
import { Search } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useState } from "react";

// components
import SearchContentDialog from "./SearchContentDialog";

// types
import { type SearchBarInitialContentsType } from "../../../../Header";

function SearchDesktop({
  searchResults
}: {
  searchResults: SearchBarInitialContentsType | null;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <div
        className="z-20 max-lg:hidden absolute top-0.5 left-1/2 -translate-x-1/2"
        onClick={() => {
          setIsFocused(true);
        }}
      >
        <section
          className={`z-[999] absolute max-lg:hidden lg:w-[350px] -translate-x-[calc(50%_-_28px)] outline-none text-charcoal-3/90 backdrop-blur-md bg-ivory/80 rounded-xl w-fit py-2.5 px-4 text-base border border-charcoal-3/10 shadow-sm transition-all duration-300`}
        >
          {
            <section className="flex items-center justify-start lg:justify-between gap-4 bg-ivory-2 text-charcoal-3/80 lg:bg-transparent max-lg:px-3.5 max-lg:py-3 max-lg:rounded-2xl transition-all duration-300 focus:bg-charcoal-3/10 max-lg:mb-1.5">
              <Search
                width={20}
                height={20}
              />
              <input
                className="w-[calc(100dvw_-_50px)] lg:w-[320px] outline-none focus:outline-none bg-transparent text-base "
                autoComplete="off"
                type="text"
                name="search"
                placeholder="Search here"
                readOnly
              />
            </section>
          }
        </section>
      </div>
      <SearchContentDialog
        isFocused={isFocused}
        searchResults={searchResults}
        onChangeIsFocused={setIsFocused}
      />
    </>
  );
}

export default memo(SearchDesktop);
