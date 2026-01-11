// types
import { ClassNameType } from "@/common/types/reactTypes";
import { BasicAlignmentType } from "@/common/types/types";

export default function Heading1({
  label,
  align,
  variant,
  useH1,
  useH2,
  className
}: {
  label: string;
  align?: BasicAlignmentType;
  variant?: "default" | "item-name" | "item-price";
  useH1?: boolean;
  useH2?: boolean;
  className?: ClassNameType;
}) {
  const style = `${!align || align === "left" ? "" : align === "middle" ? "text-center" : "text-right"} ${variant === "item-name" ? `text-charcoal-3 text-[20px] sm:text-[24px]` : variant === "item-price" ? `text-charcoal-3 font-medium text-[25px] sm:text-[30px]` : `text-sienna pb-4 sm:pt-0 sm:pb-10 text-[32px] sm:text-4xl`} tracking-tight leading-none `;

  if (useH1) return <h1 className={`${style} ${className || ""}`}>{label}</h1>;
  if (useH2) return <h2 className={`${style} ${className || ""}`}>{label}</h2>;
  return <div className={`${style} ${className || ""}`}>{label}</div>;
}
