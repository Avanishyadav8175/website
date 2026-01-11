import { SetStateType } from "@/common/types/reactTypes";
import { MutableRefObject, useEffect, useState } from "react";

export default function ProductText({
  imgText,
  setImgText,
  textLetterLimit,
  ref
}: {
  imgText: string | undefined;
  setImgText: SetStateType<string | undefined>;
  textLetterLimit: number;
  ref: MutableRefObject<null>;
}) {
  const [isFocusable, setIsFocusable] = useState<boolean>(false);

  const presets = [
    "Happy Birthday",
    "Greetings",
    "Congratulations",
    "Happy Anniversary"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsFocusable((prev) => true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full max-sm:h-[90px]">
        <textarea
          className="bg-ivory-2 rounded-xl outline-none focus:outline-none p-3 resize-none w-full h-full z-10 placeholder:text-charcoal-3/30"
          value={imgText}
          ref={ref}
          placeholder="Enter message here..."
          onChange={(e) =>
            setImgText((prev) =>
              textLetterLimit
                ? e.target.value.substring(0, textLetterLimit)
                : e.target.value
            )
          }
          readOnly={!isFocusable}
        />

        <span className="absolute bottom-2.5 right-3 z-50 text-xs text-charcoal-3/80">
          {imgText?.length || 0} / {textLetterLimit}
        </span>
      </div>
      <div className="overflow-x-scroll scrollbar-hide flex items-center justify-start gap-3">
        {presets.map((str, index) => (
          <span
            onClick={() =>
              setImgText((prev) =>
                textLetterLimit
                  ? `${prev || ""}${str} `.substring(0, textLetterLimit)
                  : `${prev || ""}${str} `
              )
            }
            className={`cursor-pointer border sm:border-[1.5px] border-ash/40 sm:border-ash/60 font-medium p-1 px-2.5 rounded-lg whitespace-nowrap text-sm text-charcoal-3/50 sm:text-charcoal-3/60 hover:sm:text-charcoal-3/90 hover:sm:border-ash/95 hover:sm:bg-ash-3/20 transition-colors duration-300`}
            key={index}
          >
            {str}
          </span>
        ))}
      </div>
    </div>
  );
}
