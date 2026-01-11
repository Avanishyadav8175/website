// utils
import { memo } from "react";

// components
import Link from "next/link";

function SearchResultContentCategoryNew({
  name,
  slug,
  collapse
}: {
  name: string;
  slug: string;
  collapse: () => void;
}) {
  return (
    <Link
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna whitespace-nowrap"
      href={`/${slug}`}
      onClick={collapse}
      prefetch
    >
      {name}
    </Link>
  );
}

export default memo(SearchResultContentCategoryNew);
