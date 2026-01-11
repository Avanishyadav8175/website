// types
import { BasicAlignmentType } from "@/common/types/types";

export default function Heading2({
  label,
  align
}: {
  label: string;
  align?: BasicAlignmentType;
}) {
  return (
    <div
      className={`${!align || align === "left" ? "" : align === "middle" ? "text-center" : "text-right"} text-sienna tracking-tight text-[28px] sm:text-[30px] font-light sm:text-4xl  w-full`} //pb-5 sm:pt-0 sm:pb-10
    >
      {label}
    </div>
  );
}
