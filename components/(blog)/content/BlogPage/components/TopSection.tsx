import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { CheckIcon, Copy, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function BlogH1Heading({ title }: { title: string }) {
  return <h1 className="text-3xl sm:text-3xl font-medium">{title}</h1>;
}

export function BlogTags({
  tags,
  showAll
}: {
  tags: { label: string; path: string }[];
  showAll?: boolean;
}) {
  if (!showAll)
    return (
      <>
        <Link
          href={tags[0].path}
          className="rounded-full py-[3px] px-4 bg-charcoal-3/10 sm:bg-charcoal-3/20 text-charcoal-3/85 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/30"
        >
          {tags[0].label}
        </Link>
        {tags.length > 1 ? (
          <div className="cursor-pointer duration-300 transition-all hover:underline hover:underline-offset-2 text-charcoal-3/65 hover:text-charcoal-3/90">
            +{tags.length - 1 || 1} more
          </div>
        ) : (
          <></>
        )}
      </>
    );

  return (
    <div className="flex items-center justify-start flex-wrap *:whitespace-nowrap gap-2.5 sm:gap-2 max-sm:ml-7">
      {tags.map((tag, index) => (
        <Link
          key={index}
          href={tag.path}
          className="text-sm rounded-full py-[3px] px-4 bg-charcoal-3/10 sm:bg-charcoal-3/20 text-charcoal-3/85 cursor-pointer transition-all duration-300 hover:bg-charcoal-3/30"
        >
          {tag.label}
        </Link>
      ))}
    </div>
  );
}

export function BlogShareButton({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleClipboardCopy = () => {
    try {
      navigator.clipboard.writeText(link);
    } finally {
      setIsCopied((prev) => true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied((prev) => false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <>
      <Popover>
        <PopoverTrigger className="items-start max-sm:hidden">
          <span className="ml-3 px-2 cursor-pointer flex items-center justify-center gap-x-2">
            <Share2
              strokeWidth={1.5}
              width={20}
              className="max-sm:scale-75"
            />
            <span className="text-xs sm:hidden">Share</span>
          </span>
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
                <CheckIcon
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
              {link}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
