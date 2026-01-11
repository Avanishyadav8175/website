// utils
import { lazy, memo } from "react";

// components
import ContentReviews from "./ContentReviews";
const LazyContentReviewImages = lazy(() => import("./ContentReviewImages"));
import { Suspense } from "react";

// types
import { ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";
import { ImageDocument } from "@/common/types/documentation/media/image";

function ContentReviewSectionUI({
  contentId,
  review,
  images
}: {
  contentId: string;
  review: ContentReviewDocument;
  images: ImageDocument[];
}) {
  return (
    <div
      className={`max-sm:px-0 max-[1210px]:px-4 w-full grid grid-cols-1 ${images.length > 0 ? `sm:grid-cols-[1fr_3fr]` : `sm:grid-cols-1`} gap-[5px] sm:gap-[14px] `}
    >
      {Boolean(images.length) && (
        <Suspense fallback={<></>}>
          <LazyContentReviewImages images={images} />
        </Suspense>
      )}
      <ContentReviews
        contentId={contentId}
        review={review}
        imageCount={images.length}
      />
    </div>
  );
}

export default memo(ContentReviewSectionUI);
