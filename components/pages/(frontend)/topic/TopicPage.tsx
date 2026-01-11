"use client";

// decorators
import { BASE_HOME_BG_COLOR } from "../Home/static/pallette";

// constants
import {
  DOMAIN,
  GOOGLE_ANALYTICS_ID
} from "@/common/constants/environmentVariables";

// utils
import { memo } from "react";

// hooks
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import CategoryBannerSection from "@/components/(frontend)/category/components/banner/CategoryBannerSection";
import CategoryBottomContentSection from "@/components/(frontend)/category/components/textContent/CategoryBottomContentSection";
import CategoryContentCountSort from "@/components/(frontend)/category/components/CategoryContentCountSort";
import CategoryFAQSection from "@/components/(frontend)/category/components/faq/CategoryFAQSection";
import CategoryMobileFilterSort from "@/components/(frontend)/category/components/CategoryMobileFilterSort";
import CategoryQuickLinkSection from "@/components/(frontend)/category/components/quickLink/CategoryQuickLinksSection";
import CategoryRelatedCategorySection from "@/components/(frontend)/category/components/relatedCategory/CategoryRelatedCategorySection";
import CategoryReviewSection from "@/components/(frontend)/category/components/review/CategoryReviewSection";
import CategoryTitle from "@/components/(frontend)/category/components/CategoryTitle";
import CategoryTopContentSection from "@/components/(frontend)/category/components/textContent/CategoryTopContentSection";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import TopicContents from "./components/TopicContents";

// types
import { type BreadcrumbsType } from "@/common/types/types";
import { type CategoryPageSort } from "@/components/(frontend)/category/types/sort";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type SchemaDataType } from "@/common/types/seoTypes";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { CityDocument } from "@/common/types/documentation/presets/city";

function TopicPage({
  breadcrumbs,
  topic
}: {
  breadcrumbs: BreadcrumbsType[];
  topic: TopicDocument;
}) {
  // hooks
  const {
    isReady,
    location: {
      data: { selectedCity },
      methods: { onChangeCity }
    },
    sort: {
      data: { sortBy: selectedSortBy },
      method: { onChangeSortBy: onChangeSelectedSortBy }
    }
  } = useAppStates();

  // states
  const [changedSortBy, setChangedSortBy] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<CategoryPageSort>("popularity");

  // variables
  const categorySlug = useMemo(
    () => (topic.category as ContentCategoryDocument).slug,
    [topic]
  );
  const topicSlug = useMemo(() => topic.slug, [topic]);
  const slug = useMemo(
    () => `${categorySlug}/${topicSlug}`,
    [categorySlug, topicSlug]
  );

  // variables
  const schemaData: { url: string; data: SchemaDataType } = useMemo(
    () => ({
      url: `${DOMAIN}/${slug}`,
      data: {
        Category: {
          name: topic.name || topic?.info?.heading || "",
          breadcrumbs: [
            { label: "Homepage", url: "/" },
            ...breadcrumbs.map(({ label, link }) => ({ label, url: link }))
          ],
          faqs: topic?.seo?.faqs?.length
            ? topic.seo.faqs.map(
                (seo: { question: string; answer: string }) => ({
                  q: seo.question,
                  a: seo.answer
                })
              )
            : [],
          product: {
            name: topic?.info?.heading || topic?.name || "name",
            description: topic?.seo?.meta?.description || "",
            highPrice: topic._page?.maxPrice || 4999,
            lowPrice: topic._page?.minPrice || 999,
            ratingCount: topic._page?.ratingCount || 1699,
            ratingValue: topic._page?.averageRating || 4.8,
            reviewCount: Math.ceil((topic._page?.ratingCount || 1699) * 0.2),
            offerCount: topic._page?.contentCount || 73
          }
        }
      }
    }),
    [slug, breadcrumbs, topic]
  );

  // event handlers
  const handleChangeSortBy = useCallback(
    (sortBy: string) => {
      if (!changedSortBy) {
        setChangedSortBy(true);
      }

      setSortBy(sortBy as CategoryPageSort);
      onChangeSelectedSortBy({
        slug,
        sortBy: sortBy as CategoryPageSort
      });
    },
    [slug, changedSortBy, onChangeSelectedSortBy]
  );

  // side effects
  useEffect(() => {
    if (isReady) {
      const topicDefaultCity = (topic?.city as CityDocument)
        ? (topic?.city as CityDocument)
        : undefined;

      if (!selectedCity && topicDefaultCity) {
        onChangeCity(topicDefaultCity);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  useEffect(() => {
    if (isReady && selectedSortBy) {
      const [selectedSortBySlug, selectedSortBySort] =
        selectedSortBy.split(":");

      if (selectedSortBySlug === slug && selectedSortBySort !== sortBy) {
        if (!changedSortBy) {
          setChangedSortBy(true);
        }

        setSortBy(selectedSortBySort as CategoryPageSort);
      } else {
        onChangeSelectedSortBy({ slug, sortBy: sortBy });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, selectedSortBy]);

  return (
    <>
      <SchemaOrgScripts
        data={schemaData.data}
        pageType="Category"
        url={schemaData.url}
      />
      <CategoryBannerSection banner={topic.media?.banner} />
      <CategoryTitle
        title={topic.info.heading || ""}
        count={topic._page?.contentCount}
        rating={topic._page?.averageRating || 0}
        ratingCount={topic._page?.ratingCount || 0}
        extraPadding={topic.media && topic.media.banner ? true : false}
      />
      <CategoryTopContentSection topContent={topic?.info?.topContent} />
      <CategoryRelatedCategorySection
        relatedCategories={topic.relatedCategories}
      />
      {/* <CategoryContentCountSort
        count={topic._page?.contentCount}
        sortBy={sortBy}
        onChangeSortBy={handleChangeSortBy}
      /> */}
      <div
        className={`bg-ivory-1 mt-6 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] p-0 sm:p-3 rounded-2xl overflow-hidden`}
      >
        <CategoryQuickLinkSection quickLinks={topic.media?.quickLinks} />
        <TopicContents
          categorySlug={categorySlug}
          topicSlug={topicSlug}
          defaultCityId={topic._page?.defaultCityId}
          changedSortBy={changedSortBy}
          sortBy={sortBy}
          canLoadMore={
            (topic._page?.contentCount || 0) >
            (topic?._page?.contents?.length || 0)
          }
          initialContents={(topic?._page?.contents || []) as ContentDocument[]}
          onChangeSortBy={setSortBy}
        />
      </div>
      <CategoryReviewSection
        categoryId={topic._id as string}
        reviews={topic?.personalizedReviews}
      />
      <CategoryBottomContentSection
        bottomContent={topic?.info?.bottomContent}
      />
      <CategoryFAQSection faqs={topic?.seo?.faqs} />
      {/* <CategoryMobileFilterSort
        sortBy={sortBy}
        onChangeSortBy={handleChangeSortBy}
      /> */}
      <div
        className={`${BASE_HOME_BG_COLOR} w-full sm:hidden h-20 -mt-14 z-[90]`}
      />
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}

export default memo(TopicPage);
