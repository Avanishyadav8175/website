// icons
import { SquarePen } from "lucide-react";

export default function CartItemUploadedText({ text }: { text: string }) {
  return (
    <div className="text-sm text-charcoal-3/60 flex items-center justify-start gap-x-2 col-start-2 max-sm:col-start-2 sm:translate-y-[3px]">
      <SquarePen
        strokeWidth={2}
        height={14}
        width={14}
      />
      <span className="truncate max-sm:max-w-[45dvw]">{text}</span>
    </div>
  );
}
