// utils
import { memo } from "react";

// types
import { type ReactNode } from "react";

function ContentHorizontalSpacing({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-4 min-[1350px]:px-0 ${className || ""}`}>
      {children}
    </section>
  );
}

export default memo(ContentHorizontalSpacing);
