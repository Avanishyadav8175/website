import { Children, ClassNameType } from "@/common/types/reactTypes";

export default function BoxTheme({
  children,
  excludeBox,
  isContent,
  noPadding,
  className
}: {
  children: Children;
  excludeBox?: boolean;
  isContent?: boolean;
  noPadding?: boolean;
  className?: ClassNameType;
}) {
  return (
    <div
      className={
        excludeBox
          ? className || ""
          : `bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] ${isContent ? "p-0 sm:p-3" : noPadding ? "py-4 sm:py-5" : "p-3 py-4 sm:p-4 sm:py-5"} rounded-2xl overflow-hidden ${className || ""}`
      }
    >
      {children}
    </div>
  );
}

export function DashboardBoxTheme({
  children,
  excludeBox,
  isContent,
  noPadding,
  className
}: {
  children: Children;
  excludeBox?: boolean;
  isContent?: boolean;
  noPadding?: boolean;
  className?: ClassNameType;
}) {
  return (
    <div
      className={
        excludeBox
          ? className || ""
          : `bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] ${noPadding ? "py-4 sm:py-5" : "p-3 py-4 sm:p-4 sm:py-5"} rounded-2xl overflow-hidden ${className || ""}`
      }
    >
      {children}
    </div>
  );
}
