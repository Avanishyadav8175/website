// icons
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { toSlug } from "@/common/utils/slugOperations";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SearchBox({
  keyword,
  onChangeKeyword,
  isFocused
}: {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
  isFocused: (isFocused: boolean) => void;
}) {
  const { push } = useRouter();
  const inputRef = useRef(null);

  return (
    <section className="flex items-center justify-start sm:justify-between gap-4 bg-ivory-2 text-charcoal-3/80 sm:bg-transparent max-sm:px-3.5 max-sm:py-3 max-sm:rounded-2xl transition-all duration-300 focus:bg-charcoal-3/10 max-sm:mb-1.5">
      <SearchIcon
        width={20}
        height={20}
      />
      <input
        ref={inputRef}
        className="w-[calc(100dvw_-_50px)] sm:w-[320px] outline-none focus:outline-none bg-transparent text-base "
        autoComplete="off"
        type="text"
        name="search"
        placeholder="Search here"
        value={keyword}
        onChange={(e) => {
          onChangeKeyword(e.target.value);
        }}
        onFocus={() => {
          isFocused(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            isFocused(false);
          }, 150);
        }}
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            isFocused(false);
            push(`${FRONTEND_LINKS.SEARCH_PAGE}?key=${toSlug(keyword)}`);
            onChangeKeyword("");
          }

          if (key === "Escape") {
            isFocused(false);
            onChangeKeyword("");
            if (inputRef.current)
              // @ts-ignore
              inputRef.current.blur();
          }
        }}
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
