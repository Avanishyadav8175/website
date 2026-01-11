
// components
import SearchTrendingKeyword from "./SearchTrendingKeyword";
import { TrendingUp } from "lucide-react";

export default function SearchTrendingKeywords({
  aiTags,
  collapse
}: {
  aiTags: string[];
  collapse: () => void;
}) {
  if (aiTags && aiTags.length > 0)
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
          {aiTags.map((trendingKeyword, index) => (
            <SearchTrendingKeyword
              key={index}
              trendingKeyword={trendingKeyword}
              onClick={collapse}
            />
          ))}
        </section>
      </section>
    );

  return <></>;
}
