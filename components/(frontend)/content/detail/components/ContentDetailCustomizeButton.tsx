// icons
import { Pencil, SquarePen, WandSparkles } from "lucide-react";

// utils
import { memo } from "react";

function ContentDetailCustomizeButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className={`cursor-pointer relative group text-moss border border-moss/60 px-3 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-lg text-center whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 z-[901]`}
      onClick={onClick}
    >
      <WandSparkles
        width={15}
        height={15}
      />
      <span className="text-base">Customize it</span>
    </div>
  );
}

export default memo(ContentDetailCustomizeButton);
