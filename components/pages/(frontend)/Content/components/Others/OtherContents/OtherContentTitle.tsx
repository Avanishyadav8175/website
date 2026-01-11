import { ClassNameType } from "@/common/types/reactTypes";

export default function OtherContentTitle({
  title,
  id,
  className
}: {
  title: string;
  id?: string;
  className?: ClassNameType;
}) {
  return (
    <div
      className={`text-xl sm:text-2xl sm:pl-3.5 font-medium text-charcoal-3 ${className || ""}`}
      id={id || `__${String(Math.ceil(Math.random() * 1000))}__`}
    >
      {title}
    </div>
  );
}
