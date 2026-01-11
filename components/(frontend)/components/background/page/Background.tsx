// components
import StickyButtons from "../components/StickyButtons";

// types
import { type ReactNode } from "react";

export default async function Background({
  children,
  showStickyButtons
}: {
  children: ReactNode;
  showStickyButtons?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-stretch justify-start min-h-device bg-[#fbfbfb]`}
    >
      {children}
      {Boolean(showStickyButtons) && <StickyButtons />}
    </div>
  );
}
