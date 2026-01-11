
// libraries
import { v4 as uuid } from "uuid";

// hooks
import { useSearch } from "@/hooks/useSearch/useSearch";

// components
import SearchHistoryKeyword from "./SearchHistoryKeyword";
import { History } from "lucide-react";

export default function SearchHistory() {
  // hooks
  const { history } = useSearch();

  if (history && history.length > 0)
    return (
      <section className="flex flex-col gap-2 py-2">
        <span className="text-charcoal-3/90 font-medium flex items-center justify-start gap-2">
          <History
            strokeWidth={1.5}
            width={19}
            height={19}
          />
          <span>History</span>
        </span>
        <section className="flex pt-0.5 gap-x-3 gap-y-2.5 items-start justify-start flex-wrap">
          {history.map((keyword) => (
            <SearchHistoryKeyword
              key={uuid()}
              keyword={keyword}
            />
          ))}
        </section>
      </section>
    );

  return <></>;
}
