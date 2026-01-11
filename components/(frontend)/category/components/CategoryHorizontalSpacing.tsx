// utils
import { memo } from "react";

// types
import { type ReactNode } from "react";

function CategoryHorizontalSpacing({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-3 1200:px-0 ${className || ""}`}>{children}</div>;
}

export default memo(CategoryHorizontalSpacing);
