// icons
import { TrendingUp } from "lucide-react";

// utils
import { memo } from "react";

// components
import SearchTrendingKeywordNew from "./SearchTrendingKeywordNew";

// types
import { type SearchBarInitialContentsType } from "../../../../../Header";

function SearchTrendingKeywordsNew({
  trendingKeywords,
  collapse
}: {
  trendingKeywords: SearchBarInitialContentsType["trendingKeywords"];
  collapse: () => void;
}) {
  if (trendingKeywords && trendingKeywords.length > 0)
    return (
      <section className="flex flex-col gap-2 pb-2">
        <span className="text-charcoal-3/90 font-medium flex items-center justify-start gap-2">
          <TrendingUp
            strokeWidth={1.5}
            width={19}
            height={19}
          />
          <span>Trending Searches</span>
        </span>
        <section className="flex pt-0.5 gap-x-3 gap-y-2.5 items-start justify-start flex-wrap">
          {trendingKeywords.map(({ label, path }, index) => (
            <SearchTrendingKeywordNew
              key={index}
              label={label}
              path={path}
              onClick={collapse}
            />
          ))}
        </section>
      </section>
    );

  return <></>;
}

export default memo(SearchTrendingKeywordsNew);
