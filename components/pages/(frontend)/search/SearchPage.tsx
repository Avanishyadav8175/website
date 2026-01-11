"use client";

// hooks
import { useSearch } from "@/hooks/useSearch/useSearch";

// components
import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";
import { useEffect, useRef, useState } from "react";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import FrontendCategoryListTitle from "../CategoryList/components/ListTitle/ListTitle";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
import { Loader2 } from "lucide-react";
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";

export default function SearchPage() {
  // hooks
  const { searchPageKeyword, searchPageContents: contents } = useSearch();

  // const loadMoreRef = useRef(null);

  // const [displayContents, setDisplayContents] = useState<ContentDocument[]>(
  //   contents.slice(0, 20)
  // );
  // const [noMoreContentsToLoad, setNoMoreContentsToLoad] =
  //   useState<boolean>(false);

  // const canLoadMoreContents = displayContents.length !== contents.length;

  // const handleLoadMore = () => {
  //   if (canLoadMore) {
  //     setDisplayContents([
  //       ...displayContents,
  //       ...contents.slice(displayContents.length, displayContents.length + 20)
  //     ]);
  //   } else setNoMoreContentsToLoad((prev) => true);
  // };

  // useEffect(() => {
  //   // ===[ OBSERVE QUICK LINKS ]=========================================
  //   const observeLoadMore = () => {
  //     const loadMoreDiv = loadMoreRef.current;
  //     if (!loadMoreDiv) return;

  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             handleLoadMore();
  //           }
  //         });
  //       },
  //       { threshold: 0.5 }
  //     );

  //     observer.observe(loadMoreDiv);
  //   };

  //   observeLoadMore();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <BodyWrapper>
      {/* <main className="pt-5 flex flex-col justify-start"> */}
      <FrontendCategoryListTitle
        title={`Results for "${searchPageKeyword}"`}
        onlyTitle
        totalRating={0}
        totalReviews={0}
      />

      <div className="flex max-sm:flex-col items-start sm:items-center justify-start sm:justify-between py-5 max-sm:px-3.5">
        <div className="text-lg sm:text-xl font-medium max-1200:px-2 whitespace-nowrap text-charcoal-3/80">
          {contents.length || 0} Products
        </div>
        <div className="max-sm:hidden relative flex items-center justify-end max-w-[200px] *:whitespace-nowrap overflow-x-scroll scrollbar-hide w-[100dvw] text-sm"></div>
      </div>

      <div className="max-sm:px-3.5">
        <BoxTheme isContent>
          <FrontendProductTiles
            productList={contents}
            inCategoryPage
            currSort={"popularity"}
            extraCurved={true}
            sync
          />
        </BoxTheme>
      </div>
      {/* {canLoadMoreContents ? (
        <div
          ref={loadMoreRef}
          onClick={handleLoadMore}
          className={`flex items-center rounded-lg justify-center gap-2 w-full mt-8 py-2 text-lg text-center transition-all duration-300 text-charcoal-3/40 ${noMoreContentsToLoad ? "hidden" : ""}`}
        >
          <Loader2
            strokeWidth={1.5}
            width={19}
            height={19}
            className="animate-spin"
          />
          <span>Loading more...</span>
        </div>
      ) : (
        <div className="w-full h-2" />
      )} */}
      {/* </main> */}
    </BodyWrapper>
  );
}
