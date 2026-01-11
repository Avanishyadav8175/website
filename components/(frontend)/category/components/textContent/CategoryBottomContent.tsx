// decorators
import { BASE_HOME_BG_COLOR } from "@/components/pages/(frontend)/Home/static/pallette";

// utils
import { memo } from "react";

// components
import CategoryTextContent from "./CategoryTextContent";

function CategoryBottomContent({ bottomContent }: { bottomContent: string }) {
  return (
    <div
      className={`px-3 1200:px-0 ${BASE_HOME_BG_COLOR} z-[820] pt-8 max-sm:px-0`}
    >
      <div
        className={`bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] p-3 py-4 sm:p-4 sm:py-5 rounded-2xl overflow-hidden`}
      >
        <div className="px-1">
          <CategoryTextContent text={bottomContent} />
        </div>
      </div>
    </div>
  );
}

export default memo(CategoryBottomContent);
