// icons
import { TrendingUp } from "lucide-react";

// utils
import { memo } from "react";

// components
import Link from "next/link";

function SearchTrendingKeywordNew({
  label,
  path,
  onClick
}: {
  label: string;
  path: string;
  onClick: () => void;
}) {
  return (
    <Link
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna flex items-center justify-start gap-1.5"
      href={path}
      onClick={onClick}
      prefetch
    >
      <span>{label}</span>
      <TrendingUp
        width={16}
        height={16}
      />
    </Link>
  );
}

export default memo(SearchTrendingKeywordNew);
