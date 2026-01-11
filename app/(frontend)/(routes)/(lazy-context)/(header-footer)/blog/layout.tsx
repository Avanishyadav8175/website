// types
import { ReactNode } from "react";

export default async function FrontendBlogsRoot({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="max-w-1200 relative left-1/2 -translate-x-1/2 flex flex-col justify-start overflow-x-hidden scrollbar-hide">
      {children}
    </div>
  );
}
