import { Children, ClassNameType } from "@/common/types/reactTypes";

export const SubmitAndReset = ({
  children,
  position,
  className
}: {
  children: Children;
  position: "right" | "left" | "center";
  className?: ClassNameType;
}) => (
  <div
    className={`flex bg-ivory-1 items-center sticky bottom-0 pb-4 pt-2.5 ${position === "right" ? "justify-end" : position === "left" ? "justify-start" : "justify-center"} gap-5 mt-3 ${className || ""}`}
  >
    {children}
  </div>
);
