// types
import { type ReactNode } from "react";

export default function ContentGridWrapper({
  children
}: {
  children: ReactNode;
}) {
  return (
    <section className="relative max-sm:bg-white grid grid-cols-1 lg:grid-cols-[590px_auto] sm:pb-5 gap-0 sm:gap-x-1.5 sm:gap-y-5 items-start justify-stretch">
      {children}
    </section>
  );
}
