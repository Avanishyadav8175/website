// utils
import { memo } from "react";

// hooks
import { useState } from "react";

function ContentReviewDetails({ details }: { details: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <span
        className={`mt-[3px] text-[15px] text-zinc-700 ${isExpanded ? "" : "line-clamp-4"} cursor-pointer`}
      >
        {details}
      </span>
      {!isExpanded && details.length > 52 && (
        <span
          className="text-[14px] text-zinc-500 mb-[3px] cursor-pointer"
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          Read more
        </span>
      )}
    </>
  );
}

export default memo(ContentReviewDetails);
