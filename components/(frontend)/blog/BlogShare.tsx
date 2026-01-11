"use client";

// icons
import { Check, Copy, Share2 } from "lucide-react";

// hooks
import { useEffect, useState } from "react";

// components
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export default function BlogShare({ url }: { url: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleClipboardCopy = () => {
    try {
      navigator.clipboard.writeText(url);
    } finally {
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <Popover>
      <PopoverTrigger className="items-start max-sm:hidden">
        <button
          title="Share"
          className="p-4 cursor-pointer flex items-center justify-center gap-x-2"
        >
          <Share2
            strokeWidth={1.5}
            width={25}
            className="max-sm:scale-75"
          />
          <span className="text-xs sm:hidden">Share</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        sideOffset={0}
        className="rounded-2xl shadow-2xl border-charcoal-3/20 p-3"
      >
        <div className="grid grid-cols-[1fr_36px] items-center auto-rows-min gap-y-2">
          <span className="pl-1">Click to copy</span>
          <div
            onClick={!isCopied ? handleClipboardCopy : () => {}}
            className={`flex items-center justify-center aspect-square cursor-pointer rounded-lg transition-all duration-300 hover:bg-charcoal-3/15`}
          >
            {isCopied ? (
              <Check
                width={18}
                stroke="#00aa00"
              />
            ) : (
              <Copy
                strokeWidth={1.5}
                width={18}
              />
            )}
          </div>
          <div className="bg-charcoal-3/15 rounded-lg px-3.5 py-2.5 col-span-2 overflow-x-scroll scrollbar-hide whitespace-nowrap text-charcoal-3/95">
            {url}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
