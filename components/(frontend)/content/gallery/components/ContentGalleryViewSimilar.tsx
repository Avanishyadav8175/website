// icons
import { GalleryHorizontalEnd } from "lucide-react";

// utils
import { memo } from "react";

function ContentGalleryViewSimilar({ onClick }: { onClick: () => void }) {
  return <></>
  return (
    <div className="group absolute bottom-2 left-4 sm:right-1.5 sm:bottom-2 grid *:row-start-1 *:col-start-1 place-items-center sm:justify-end cursor-pointer">
      <div
        className="max-sm:-translate-x-2 rounded-full p-2 px-3.5 max-sm:text-white bg-charcoal-3/45 sm:bg-white backdrop-blur-sm flex items-center justify-start gap-2 group-hover:sm:bg-ivory-2 sm:shadow-xl transition-all duration-300 overflow-hidden text-sm"
        onClick={onClick}
      >
        <GalleryHorizontalEnd
          strokeWidth="2"
          width={17}
          height={17}
        />
        <div>View Similar</div>
      </div>
    </div>
  );
}

export default memo(ContentGalleryViewSimilar);
