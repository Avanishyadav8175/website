import { Triangle } from "lucide-react";

export default function SortUI({
  sortValue
}: {
  sortValue: "none" | "asc" | "desc";
}) {
  return (
    <span className="flex flex-col justify-center items-center gap-0.5">
      {sortValue !== "desc" ? (
        <Triangle
          strokeWidth={1.5}
          width={6}
          height={6}
          fill="#444"
        />
      ) : (
        <></>
      )}

      {sortValue !== "asc" ? (
        <Triangle
          strokeWidth={1.5}
          width={6}
          height={6}
          fill="#444"
          className="rotate-180"
        />
      ) : (
        <></>
      )}
    </span>
  );
}
