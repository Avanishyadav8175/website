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
import SubTopicContents from "./components/SubTopicContents";

// types
import { type BreadcrumbsType } from "@/common/types/types";
import { type CategoryPageSort } from "@/components/(frontend)/category/types/sort";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type SchemaDataType } from "@/common/types/seoTypes";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { CityDocument } from "@/common/types/documentation/presets/city";

function SubTopicPage({
  breadcrumbs,
  subTopic
}: {
  breadcrumbs: BreadcrumbsType[];
  subTopic: SubTopicDocument;
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
    () => (subTopic.category as ContentCategoryDocument).slug,
    [subTopic]
  );
  const topicSlug = useMemo(
    () => (subTopic.topic as TopicDocument).slug,
    [subTopic]
  );
  const subTopicSlug = useMemo(() => subTopic.slug, [subTopic]);
  const slug = useMemo(
    () => `${categorySlug}/${topicSlug}/${subTopicSlug}`,
    [categorySlug, topicSlug, subTopicSlug]
  );

  // variables
  const schemaData: { url: string; data: SchemaDataType } = useMemo(
    () => ({
      url: `${DOMAIN}/${slug}`,
      data: {
        Category: {
          name: subTopic.name || subTopic?.info?.heading || "name",
          breadcrumbs: [
            { label: "Homepage", url: "/" },
            ...breadcrumbs.map(({ label, link }) => ({ label, url: link }))
          ],
          faqs: subTopic?.seo?.faqs?.length
            ? subTopic.seo.faqs.map(
                (seo: { question: string; answer: string }) => ({
                  q: seo.question,
                  a: seo.answer
                })
              )
            : [],
          product: {
            name: subTopic?.info?.heading || subTopic?.name || "",
            description: subTopic?.seo?.meta?.description || "",
            highPrice: subTopic._page?.maxPrice || 4999,
            lowPrice: subTopic._page?.minPrice || 999,
            ratingCount: subTopic._page?.ratingCount || 1699,
            ratingValue: subTopic._page?.averageRating || 4.8,
            reviewCount: Math.ceil((subTopic._page?.ratingCount || 1699) * 0.2),
            offerCount: subTopic._page?.contentCount || 73
          }
        }
      }
    }),
    [slug, breadcrumbs, subTopic]
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
      const subTopicDefaultCity = (subTopic?.city as CityDocument)
        ? (subTopic?.city as CityDocument)
        : undefined;

      if (!selectedCity && subTopicDefaultCity) {
        onChangeCity(subTopicDefaultCity);
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
      <CategoryBannerSection banner={subTopic.media?.banner} />
      <CategoryTitle
        title={subTopic.info.heading || ""}
        rating={subTopic._page?.averageRating || 0}
        count={subTopic._page?.contentCount}
        ratingCount={subTopic._page?.ratingCount || 0}
        extraPadding={subTopic.media && subTopic.media.banner ? true : false}
      />
      <CategoryTopContentSection topContent={subTopic?.info?.topContent} />
      <CategoryRelatedCategorySection
        relatedCategories={subTopic.relatedCategories}
      />
      {/* <CategoryContentCountSort
        count={subTopic._page?.contentCount}
        sortBy={sortBy}
        onChangeSortBy={handleChangeSortBy}
      /> */}
      <div
        className={`bg-ivory-1 mt-6 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] p-0 sm:p-3 rounded-2xl overflow-hidden`}
      >
        <CategoryQuickLinkSection quickLinks={subTopic.media?.quickLinks} />
        <SubTopicContents
          categorySlug={categorySlug}
          topicSlug={topicSlug}
          subTopicSlug={subTopicSlug}
          defaultCityId={subTopic._page?.defaultCityId}
          changedSortBy={changedSortBy}
          sortBy={sortBy}
          canLoadMore={
            (subTopic._page?.contentCount || 0) >
            (subTopic?._page?.contents?.length || 0)
          }
          initialContents={
            (subTopic?._page?.contents || []) as ContentDocument[]
          }
          onChangeSortBy={setSortBy}
        />
      </div>
      <CategoryReviewSection
        categoryId={subTopic._id as string}
        reviews={subTopic?.personalizedReviews}
      />
      <CategoryBottomContentSection
        bottomContent={subTopic?.info?.bottomContent}
      />
      <CategoryFAQSection faqs={subTopic?.seo?.faqs} />
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

export default memo(SubTopicPage);
