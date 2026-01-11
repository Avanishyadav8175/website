// libraries
import { v4 as uuid } from "uuid";

// icons
import { History } from "lucide-react";

// hooks
import { useSearch } from "@/hooks/useSearch/useSearch";

export default function SearchHistoryKeyword({ keyword }: { keyword: string }) {
  // hooks
  const { onShowSearchPage } = useSearch();

  return (
    <article
      key={uuid()}
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna flex items-center justify-start gap-1.5"
      onClick={() => {
        onShowSearchPage(keyword);
      }}
    >
      <History
        strokeWidth={2}
        width={16}
        height={16}
      />
      <span>{keyword}</span>
    </article>
  );
}
