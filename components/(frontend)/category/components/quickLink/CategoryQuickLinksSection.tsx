// utils
import { memo } from "react";

// components
import CategoryQuickLinks from "./CategoryQuickLinks";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";

function CategoryQuickLinkSection({
  quickLinks
}: {
  quickLinks?: ClickableImageDocument[];
}) {
  if (quickLinks && quickLinks.length) {
    return (
      <div className="pt-3.5 pb-2 max-sm:px-3 sm:pt-2 sm:pb-5">
        <CategoryQuickLinks quickLinks={quickLinks} />
      </div>
    );
  }

  return <></>;
}

export default memo(CategoryQuickLinkSection);
