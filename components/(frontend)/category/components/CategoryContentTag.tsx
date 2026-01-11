// utils
import { memo } from "react";

// types
import { type ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";

function CategoryContentTag({
  tag
}: {
  tag: ContentListItemDataDocument["tag"];
}) {
  if (!tag) {
    return <></>;
  }

  return (
    <div
      className="absolute top-2.5 right-0 py-1 px-2 sm:px-3 rounded-l-lg text-xs sm:text-sm"
      style={{
        background: tag.backgroundColor,
        color: tag.textColor
      }}
    >
      {tag.label}
    </div>
  );
}

export default memo(CategoryContentTag);
