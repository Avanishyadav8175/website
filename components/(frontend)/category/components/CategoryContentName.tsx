// utils
import { memo } from "react";

// types
import { type ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";

function CategoryContentName({
  name,
  edible
}: {
  name: string;
  edible: ContentListItemDataDocument["edible"];
}) {
  return (
    <div
      className={`${edible ? "pr-0 grid grid-cols-[1fr_20px] items-center" : "grid grid-cols-1 items-center"} px-2 max-sm:pt-1 sm:px-3.5 z-30 text-[15px] sm:text-base text-charcoal-3/80 leading-tight relative `}
    >
      <div className={`line-clamp-1 pt-0.5 max-sm:pb-0.5 leading-tight`}>
        {name}
      </div>
    </div>
  );
}

export default memo(CategoryContentName);
