// utils
import { memo } from "react";

// types
import { type ReactNode } from "react";

function BoxTheme({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] px-2 py-4 sm:p-5 rounded-2xl overflow-hidden ${className || ""}`}
    >
      {children}
    </div>
  );
}

export default memo(BoxTheme);
