"use client";

// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// utils
import { memo } from "react";
import { scrollToSection } from "@/common/helpers/scrollToSection";

// hooks
import { useCallback, useMemo, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import ContentDetail from "@/components/(frontend)/content/detail/ContentDetail";
import ContentGallery from "@/components/(frontend)/content/gallery/ContentGallery";
import ContentGridWrapper from "@/components/(frontend)/content/ContentGridWrapper";
import ContentReviewSection from "@/components/(frontend)/content/review/ContentReviewSection";
import ContentSuggestion from "@/components/(frontend)/content/suggestion/ContentSuggestion";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type SchemaDataType } from "@/common/types/seoTypes";
import { SCHEMA_REVIEWS } from "./constants/schemaReviews";
import { PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { ColorDocument } from "@/common/types/documentation/presets/color";

function ContentPage({
  content,
  isProduct,
  serviceImage
}: {
  content: ContentDocument;
  isProduct?: boolean;
  serviceImage?: ImageDocument;
}) {
  // hooks
  const { isMobile } = useAppStates();

  // states
  const [showSimilarContentDrawer, setShowSimilarContentDrawer] =
    useState<boolean>(false);

  const [customVariant, setCustomVariant] =
    useState<ContentCustomVariantDocument | null>(null);
  const [referenceVariant, setReferenceVariant] =
    useState<ContentDocument | null>(null);

  // variables
  const aiTagSuggestionId = useMemo(() => "___similar_products___", []);
  const url = useMemo(
    () =>
      `${DOMAIN}${isProduct ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const schemaReview = useMemo(
    () =>
      (isProduct ? SCHEMA_REVIEWS.product : SCHEMA_REVIEWS.service)[
        Math.floor(Math.random() * 15)
      ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // memoizes
  const schemaData: SchemaDataType = useMemo(() => {
    const primaryCategory = content.category.primary as ContentCategoryDocument;
    const primaryImage = content.media.primary as ImageDocument;
    const schemaContentData = {
      currency: "INR",
      price: `${content.price ? content.price.base.price : 0}`,
      rating: {
        count: content.quality?.rating?.count || 284,
        avgRating: content.quality?.rating?.value || 4.8
      },
      sku: content.sku,
      url,
      validUntil: "31 Dec 2400",
      reviews: [
        {
          name: schemaReview.author,
          saidReview: schemaReview.review,
          date: (content?.createdAt
            ? new Date(content.createdAt as string)
            : new Date()
          )
            .toISOString()
            .split("T")[0],
          rated: content.quality?.rating?.value || 5,
          maxRate: 5
        }
      ],
      description: content?.seoMeta?.description || ""
    };

    return {
      Content: {
        breadcrumbs: [
          { label: "Homepage", url: "/" },
          {
            label: primaryCategory.name,
            url: `/${primaryCategory.slug}`
          },
          {
            label: content.name,
            url: `${isProduct ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`
          }
        ],
        webpage: {
          name: content.name,
          alternateName: content.name,
          description: content.seoMeta?.description || "",
          image: primaryImage.url,
          url,
          productDetails: schemaContentData
        },
        content: {
          ...schemaContentData,
          image: primaryImage.url,
          name: content.name
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contentId = useMemo(
    () =>
      referenceVariant
        ? (referenceVariant?._id as string)
        : (content._id as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const images = useMemo(
    () =>
      customVariant?.image
        ? [customVariant.image as ImageDocument]
        : referenceVariant
          ? [
              referenceVariant.media.primary as ImageDocument,
              ...(referenceVariant.media.gallery as ImageDocument[])
            ]
          : [
              content.media.primary as ImageDocument,
              ...(content.media.gallery as ImageDocument[])
            ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customVariant, referenceVariant]
  );

  const tag = useMemo(
    () =>
      referenceVariant
        ? referenceVariant.tag?.promotionTag
          ? {
              label: (
                referenceVariant.tag?.promotionTag as PromotionTagDocument
              ).name,
              color: (
                (referenceVariant.tag?.promotionTag as PromotionTagDocument)
                  .color as ColorDocument
              ).hexCode
            }
          : undefined
        : content.tag?.promotionTag
          ? {
              label: (content.tag?.promotionTag as PromotionTagDocument).name,
              color: (
                (content.tag?.promotionTag as PromotionTagDocument)
                  .color as ColorDocument
              ).hexCode
            }
          : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const similarContents = useMemo(
    () =>
      referenceVariant && referenceVariant._suggestions?.aiTag?.length
        ? (referenceVariant._suggestions.aiTag as ContentDocument[])
        : content._suggestions?.aiTag?.length
          ? (content._suggestions?.aiTag as ContentDocument[])
          : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const review = useMemo(
    () =>
      referenceVariant
        ? referenceVariant.quality?.review
        : content.quality?.review,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const reviewImages = useMemo(
    () =>
      referenceVariant
        ? (referenceVariant.media?.review as ImageDocument[]) || []
        : (content.media?.review as ImageDocument[]) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  const suggestions = useMemo(
    () =>
      referenceVariant && referenceVariant._suggestions
        ? referenceVariant._suggestions
        : content?._suggestions,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referenceVariant]
  );

  // event handlers
  const handleClickViewSimilar = useCallback(() => {
    if (isMobile) {
      setShowSimilarContentDrawer(true);
    } else {
      if (similarContents.length) {
        scrollToSection({
          targetId: aiTagSuggestionId,
          behavior: "smooth",
          align: "start",
          afterScroll: () => {}
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <>
      <ContentGridWrapper>
        <ContentGallery
          serviceImage={serviceImage}
          images={images}
          showSimilarContentDrawer={showSimilarContentDrawer}
          similarContents={similarContents}
          tag={tag}
          onClickViewSimilar={handleClickViewSimilar}
          onChangeShowSimilarContentDrawer={setShowSimilarContentDrawer}
        />
        <ContentDetail
          content={content}
          onChangeCustomVariant={setCustomVariant}
          onChangeReferenceVariant={setReferenceVariant}
        />
      </ContentGridWrapper>
      {review && (
        <ContentReviewSection
          contentId={contentId}
          title="All Reviews"
          review={review}
          images={reviewImages}
          applyBoxTheme
        />
      )}
      {suggestions && (
        <ContentSuggestion
          aiTagSuggestionId={aiTagSuggestionId}
          suggestion={suggestions}
        />
      )}
      <SchemaOrgScripts
        pageType="Content"
        data={schemaData}
        url={url}
      />
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}

export default memo(ContentPage);
