// utils
import { memo } from "react";

// components
import CategoryTopContent from "./CategoryTopContent";

function CategoryTopContentSection({ topContent }: { topContent?: string }) {
  if (topContent) {
    return <CategoryTopContent topContent={topContent} />;
  }

  return <></>;
}

export default memo(CategoryTopContentSection);
