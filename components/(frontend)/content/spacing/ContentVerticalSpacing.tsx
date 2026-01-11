// utils
import { memo } from "react";

// types
import { type ReactNode } from "react";

function ContentVerticalSpacing({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-5 sm:py-6 ${className || ""}`}>{children}</section>
  );
}

export default memo(ContentVerticalSpacing);
