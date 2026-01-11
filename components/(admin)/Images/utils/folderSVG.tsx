import { ClassNameType } from "@/common/types/reactTypes";

export default function FolderSVG({
  open,
  type,
  color
}: {
  open?: boolean;
  type: "large" | "small";
  color: ClassNameType;
}) {
  return (
    <div
      className={`grid *:row-start-1 *:col-start-1 w-full h-full place-items-center ${type === "small" && "translate-y-0.5"}`}
    >
      <div
        className={`${color} ${type === "large" ? "w-1/3 rounded-sm  -translate-x-[95%] -translate-y-0.5" : "w-[7px] rounded-[2px] -translate-x-[90%] -translate-y-[1px] scale-x-110"} aspect-[1/2]`}
      />
      <div
        className={`aspect-video h-[55%] ${type === "large" ? "rounded-md translate-y-1" : "rounded-none translate-y-0.5"} bg-gray-200 brightness-75`}
      />
      <div
        className={`aspect-video h-[55%] ${type === "large" ? "rounded-md translate-y-2.5" : "rounded-none"} bg-gray-200 scale-y-[0.99] transition-all duration-300`}
        style={
          open
            ? type === "large"
              ? { transform: "skew(-0.2rad) translate(5px,10px) scaleY(0.95)" }
              : { transform: "skew(-0.4rad) translate(4px,5px) scaleY(0.95)" }
            : type === "large"
              ? { transform: "skew(0rad) translate(0,10px) scaleY(1)" }
              : { transform: "skew(0rad) translate(0,5px) scaleY(1)" }
        }
      />
    </div>
  );
}
