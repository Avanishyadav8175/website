import { ClassNameType } from "@/common/types/reactTypes";

export const ShineAnimation = ({
  className, isPersistent
}: {
  className?: ClassNameType;
  isPersistent?: true
}) => (
  <div
    className={`absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all  ${isPersistent ? "animate-shine-infinite duration-1500" : "group-hover:animate-shine duration-500"} ${className || ""}`}
  />
);
