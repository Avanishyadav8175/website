"use client";

// requests
import { fetchTopicContents } from "@/request/page/topicContents";

// icons
import { getContentPrice } from "@/components/(frontend)/category/utils/getContentPrice";

// hooks
import { memo, useEffect, useRef, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import CategoryContent from "@/components/(frontend)/category/components/CategoryContent";

// types
import { type CategoryPageSort } from "@/components/(frontend)/category/types/sort";
import { type ContentDocument } from "@/common/types/documentation/contents/content";

function TopicContents({
  categorySlug,
  topicSlug,
  defaultCityId,
  changedSortBy,
  sortBy,
  canLoadMore,
  //   totalCount,
  //   chunkSize,
  initialContents,
  onChangeSortBy
}: {
  categorySlug: string;
  topicSlug: string;
  defaultCityId?: string;
  changedSortBy: boolean;
  sortBy: CategoryPageSort;
  canLoadMore: boolean;
  //   totalCount: number;
  //   chunkSize: number;
  initialContents: ContentDocument[];
  onChangeSortBy: (sortBy: CategoryPageSort) => void;
}) {
  // hooks
  const middleLoadMoreRef = useRef(null);
  const lastLoadMoreRef = useRef(null);
  const {
    isReady,
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // utils
  const handleSort = ({
    contents,
    sortBy
  }: {
    contents: ContentDocument[];
    sortBy: CategoryPageSort;
  }): ContentDocument[] => {
    switch (sortBy) {
      case "popularity":
        return [...contents].sort(
          (a, b) =>
            (b._listItemData?.ratingValue || 0) *
              (b._listItemData?.ratingCount || 1) -
            (a._listItemData?.ratingValue || 0) *
              (a._listItemData?.ratingCount || 1)
        );

      case "latest":
        return [...contents].sort(
          (a, b) =>
            new Date(b._listItemData!.createdDate).getTime() -
            new Date(a._listItemData!.createdDate).getTime()
        );

      case "high-to-low":
        return [...contents].sort(
          (a, b) =>
            (b._listItemData?.price || 0) - (a._listItemData?.price || 0)
        );

      case "low-to-high":
        return [...contents].sort(
          (a, b) =>
            (a._listItemData?.price || 0) - (b._listItemData?.price || 0)
        );

      default:
        return contents;
    }
  };

  // states
  const [cityId, setCityId] = useState<string | undefined>(defaultCityId);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [contents, setContents] = useState<ContentDocument[]>(
    initialContents || []
  );

  // side effects
  useEffect(() => {
    if (!loadMore) {
      const observeLoadMore = () => {
        const loadMoreDiv = middleLoadMoreRef.current;
        if (!loadMoreDiv) {
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setLoadMore(true);
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(loadMoreDiv);
      };

      observeLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadMore) {
      const observeLoadMore = () => {
        const loadMoreDiv = lastLoadMoreRef.current;
        if (!loadMoreDiv) {
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setLoadMore(true);
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(loadMoreDiv);
      };

      observeLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isReady) {
      if (selectedCity?._id && selectedCity?._id !== cityId) {
        setCityId(selectedCity?._id as string);
        setContents(
          [...contents].map((content) => {
            const updatedContent = { ...content } as ContentDocument;

            const { price, mrp } = getContentPrice({
              price: content.price!,
              city: selectedCity
            });

            updatedContent._listItemData!.price = price;
            updatedContent._listItemData!.discount = Math.round(
              ((mrp - price) / mrp) * 100
            );

            return updatedContent;
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, selectedCity]);

  useEffect(() => {
    if (canLoadMore && !isLoaded && (loadMore || changedSortBy)) {
      fetchTopicContents({ categorySlug, topicSlug })
        .then(({ data }) => {
          const contents = data as ContentDocument[];
          setContents(
            changedSortBy ? handleSort({ contents, sortBy }) : contents
          );
          setIsLoaded(true);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore, changedSortBy]);

  useEffect(() => {
    if (canLoadMore) {
      if (isLoaded) {
        setContents(handleSort({ contents, sortBy }));
      }
    } else {
      setContents(handleSort({ contents, sortBy }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 sm:gap-y-6 sm:gap-x-3 items-start justify-center`}
    >
      {contents.map(({ _id, _listItemData }, i) => (
        <CategoryContent
          key={_id as string}
          index={i}
          loadMoreRef={
            canLoadMore && !isLoaded
              ? i === 16
                ? middleLoadMoreRef
                : lastLoadMoreRef
              : undefined
          }
          content={_listItemData!}
          price={_listItemData!.price}
          discount={_listItemData!.discount}
        />
      ))}
    </div>
  );
}

export default memo(TopicContents);
