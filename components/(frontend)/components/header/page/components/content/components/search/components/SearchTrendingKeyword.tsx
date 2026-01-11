// icons
import { TrendingUp } from "lucide-react";

// components
import Link from "next/link";

export default function SearchTrendingKeyword({
  trendingKeyword,
  onClick
}: {
  trendingKeyword: string;
  onClick: () => void;
}) {
  return (
    <Link
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna flex items-center justify-start gap-1.5"
      href={"#"}
      onClick={onClick}
    >
      <span>{trendingKeyword}</span>
      <TrendingUp
        width={16}
        height={16}
      />
    </Link>
  );
}
