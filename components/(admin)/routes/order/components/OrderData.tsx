import { ClassNameType } from "@/common/types/reactTypes";

export default function RightSideData({
  data,
  title,
  showTitle,
  className
}: {
  data: (string | number | JSX.Element)[];
  title?: string;
  showTitle?: boolean;
  className?: ClassNameType;
}) {
  return (
    <section
      className={`grid grid-cols-2 gap-x-3 gap-y-2.5 pb-4 ${className || ""}`}
    >
      {title && title.length > 0 && (
        <span className="text-center text-xl text-charcoal-3 font-light py-1 pb-2 col-span-2">
          {title}
        </span>
      )}
      {data.map((str, index) => (
        <div
          key={index}
          className={`text-sm whitespace-nowrap ${index % 2 !== 0 ? "text-right flex items-center justify-end" : "capitalize"} truncate`}
        >
          {str}
        </div>
      ))}
    </section>
  );
}
