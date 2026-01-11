// utils
import { memo } from "react";

// components
import CategoryBottomContent from "./CategoryBottomContent";

function CategoryBottomContentSection({
  bottomContent
}: {
  bottomContent?: string;
}) {
  if (!bottomContent) {
    return <></>;
  }

  return <CategoryBottomContent bottomContent={bottomContent} />;
}

export default memo(CategoryBottomContentSection);
