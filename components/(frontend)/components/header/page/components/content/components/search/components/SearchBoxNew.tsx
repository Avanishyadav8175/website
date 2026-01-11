// icons
import { SearchIcon, X } from "lucide-react";

// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// utils
import { memo } from "react";
import { toSlug } from "@/common/utils/slugOperations";

// hooks
import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// types
import { type ChangeEvent } from "react";

function SearchBoxNew({
  keyword,
  onChangeKeyword,
  onChangeIsFocused,
  saveContentsToLS
}: {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
  onChangeIsFocused: (isFocused: boolean) => void;
  saveContentsToLS: () => void;
}) {
  // hooks
  const inputRef = useRef(null);
  const { push } = useRouter();

  // event handlers
  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      onChangeKeyword(value);
    },
    [onChangeKeyword]
  );

  const handleFocus = useCallback(() => {
    onChangeIsFocused(true);
  }, [onChangeIsFocused]);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      onChangeIsFocused(false);
    }, 250);
  }, [onChangeIsFocused]);

  const handleKeyDown = useCallback(
    ({ key }: { key: string }) => {
      if (key === "Enter") {
        onChangeIsFocused(false);
        saveContentsToLS();
        push(`${FRONTEND_LINKS.SEARCH_PAGE}?key=${toSlug(keyword)}`);
        onChangeKeyword("");
      }

      if (key === "Escape") {
        onChangeIsFocused(false);
        onChangeKeyword("");
        if (inputRef.current)
          // @ts-ignore
          inputRef.current.blur();
      }
    },
    [onChangeIsFocused, keyword, onChangeKeyword, push, saveContentsToLS]
  );

  return (
    <section className="flex items-center justify-start gap-4 bg-ivory-2 text-charcoal-3/80 lg:w-full lg:min-h-[50px] lg:px-4 max-lg:px-3.5 max-lg:py-3 lg:rounded-xl max-lg:rounded-2xl transition-all duration-300 focus:bg-charcoal-3/10 max-lg:mb-1.5">
      <SearchIcon
        width={20}
        height={20}
      />
      <input
        ref={inputRef}
        className="w-[calc(100dvw_-_50px)] lg:w-[320px] outline-none focus:outline-none bg-transparent text-base "
        autoComplete="off"
        type="text"
        name="search"
        placeholder="Search here"
        value={keyword}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <X
        className={`${keyword ? "opacity-100" : "opacity-0"} transition-opacity duration-150 cursor-pointer`}
        width={16}
        height={16}
        stroke="#666"
        onClick={() => {
          onChangeKeyword("");
        }}
      />
    </section>
  );
}

export default memo(SearchBoxNew);
