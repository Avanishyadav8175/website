// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// utils
import { memo } from "react";

// components
import Link from "next/link";

function SearchResultAITagNew({
  name,
  aiTagId,
  collapse
}: {
  name: string;
  aiTagId: string;
  collapse: () => void;
}) {
  return (
    <Link
      href={`${FRONTEND_LINKS.SEARCH_PAGE}?ai=${aiTagId}`}
      prefetch
      onClick={collapse}
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna"
    >
      {name}
    </Link>
  );
}

export default memo(SearchResultAITagNew);
