// components
import StickyButtons from "../components/StickyButtons";

// types
import { type ReactNode } from "react";

export default async function VendorBackground({
  children,
  showStickyButtons
}: {
  children: ReactNode;
  showStickyButtons?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-stretch justify-start bg-ivory-2`}
    >
      {children}
      {Boolean(showStickyButtons) && <StickyButtons />}
    </div>
  );
}
