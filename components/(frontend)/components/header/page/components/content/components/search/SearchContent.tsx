"use client";

// icons
import { SearchIcon } from "lucide-react";

// hooks
import { useAppStatus } from "@/hooks/useAppStatus";

// components
import SearchContentWithHook from "./SearchContentWithHook";

export default function SearchContent({
  searchResults
}: {
  searchResults: { aiTags: string[]; categories: string[][] } | null;
}) {
  // hooks
  // const { isLoaded } = useAppStatus();

  // if (isLoaded) {
  return <SearchContentWithHook searchResults={searchResults} />;
  // }

  return (
    <section
      className={`z-[999] absolute max-sm:hidden sm:w-[350px] -translate-x-[calc(50%_-_28px)] outline-none text-charcoal-3/90 backdrop-blur-md bg-ivory/80 rounded-xl w-fit py-2.5 px-4 text-base border border-charcoal-3/10 shadow-sm`}
    >
      <section className="flex items-center justify-start sm:justify-between gap-4 bg-ivory-2 text-charcoal-3/80 sm:bg-transparent max-sm:px-3.5 max-sm:py-3 max-sm:rounded-2xl transition-all duration-300 focus:bg-charcoal-3/10 max-sm:mb-1.5">
        <SearchIcon
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
    </section>
  );
}
