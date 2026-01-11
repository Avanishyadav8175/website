// utils
import { memo } from "react";

// components
import CategoryTextContent from "./CategoryTextContent";

function CategoryTopContent({ topContent }: { topContent: string }) {
  return (
    <div className={`px-3 1200:px-0 bg-ivory-1 max-sm:px-3.5`}>
      <CategoryTextContent text={topContent} />
    </div>
  );
}

export default memo(CategoryTopContent);
