"use client";

// icons
import { Search } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useState } from "react";

// components
import SearchContentDrawer from "./SearchContentDrawer";

// types
import { type SearchBarInitialContentsType } from "../../../../Header";

function SearchMobile({
  searchResults
}: {
  searchResults: SearchBarInitialContentsType | null;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="lg:hidden">
      <div
        onClick={() => {
          setIsFocused(true);
        }}
        className="flex flex-col items-center justify-center gap-0.5"
      >
        <Search width={19} strokeWidth={1.5} height={19} />
      </div>
      <SearchContentDrawer
        isFocused={isFocused}
        searchResults={searchResults}
        onChangeIsFocused={setIsFocused}
      />
    </div>
  );
}

export default memo(SearchMobile);
