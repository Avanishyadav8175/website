"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CustomFAQ({
  q,
  a,
  fullH,
  condensedH = "h-14 min-h-14",
  qClassName,
  aClassName
}: {
  q: string | JSX.Element;
  a: string | JSX.Element;
  fullH?: string;
  condensedH?: string;
  qClassName?: string;
  aClassName?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={`relative cursor-pointer overflow-auto flex flex-col justify-start pb-5 transition-all duration-300 ${open ? fullH || "h-fit" : condensedH} overflow-hidden`}
    >
      <div
        className={`px-4 top-0 z-20 border-t border-black/15 flex items-center justify-between ${condensedH} ${qClassName || ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{q}</span>
        <ChevronRight
          className={`transition-all duration-300 ${open ? "rotate-90" : "rotate-0"}`}
          width={16}
          height={16}
        />
      </div>
      <div
        className={`px-4 ${aClassName || ""} ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} transition-all duration-300`}
      >
        {a}
      </div>
    </div>
  );
}
