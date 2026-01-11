"use client";
import { Children, ClassNameType } from "@/common/types/reactTypes";
import { scrollToSection } from "@/common/helpers/scrollToSection";
import { ParentContainer } from "@/components/(frontend)/global/_Spacings/ParentContainer";
import { useMediaQuery } from "usehooks-ts";
import { IS_MOBILE } from "@/common/constants/mediaQueries";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import ContentImages from "./components/Images/ContentImages";
import ContentDetails from "./components/Details/ContentDetails";
import OtherContentTitle from "./components/Others/OtherContents/OtherContentTitle";
import ContentReviewsTitle from "./components/Others/ContentReviews/ContentReviewsTitle";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { useEffect, useState } from "react";
import { getDaysHrsMinsSecs } from "@/common/utils/getDaysHrsMinsSecs";
import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { getFutureDate } from "./utils/getFutureDate";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";
import MaxWidthWrapper from "@/components/(frontend)/global/_MaxWidthWrapper/MaxWidthWrapper";
// import SelectCityDeprecated from "@/components/(frontend)/global/SelectCity/SelectCityDeprecated";
import { ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { UnitDocument } from "@/common/types/documentation/presets/unit";
import { CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";
import FrontendContentReviews from "./components/Others/ContentReviews/ContentReviews";
import { CONTENT_PAGE_REVIEW_LIMIT } from "@/common/constants/limits";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
import { BreadcrumbsType } from "@/common/types/types";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import { SchemaDataType } from "@/common/types/seoTypes";
import { DOMAIN } from "@/common/constants/domain";
import { ReviewDocument } from "@/common/types/documentation/dynamic/review";
import { CustomerDocument } from "@/common/types/documentation/users/customer";
import moment from "moment";

export default function ContentPageOld({
  data,
  type,
  relatedContents,
  relatedAITagsContents,
  relatedCoupons,
  primaryCategoryRelatedContents,
  breadcrumbs
}: {
  data: ContentDocument;
  type: "product" | "service";
  relatedContents?: ContentDocument[];
  relatedAITagsContents?: ContentDocument[];
  relatedCoupons?: CouponDocument[];
  primaryCategoryRelatedContents?: ContentDocument[];
  breadcrumbs?: BreadcrumbsType[];
}) {
  const similarProductId = "___similar_products___";
  const isMobile = useMediaQuery(IS_MOBILE);

  const baseCustomVariantId =
    data.variants &&
    data.variants.length > 0 &&
    data.variants.filter(({ type }) => type === "custom").length > 0
      ? data.variants.filter(({ type }) => type === "custom")[0].custom
          ?.variants
        ? (data.variants.filter(({ type }) => type === "custom")[0].custom
            ?.variants[0]._id as string)
        : undefined
      : undefined;

  const [timer, setTimer] = useState<string>("");
  const [currRefId, setCurrRefId] = useState<string>(data._id as string);
  const [currCustomId, setCurrCustomId] = useState<string | undefined>(
    baseCustomVariantId
  );
  const [customVariantDetails, setCustomVariantDetails] = useState<
    { name: string; price: ContentPriceDocument } | undefined
  >();
  const [customizationImages, setCustomizationImages] = useState<
    CustomizationImageDocument[]
  >([]);

  const selectedContentData =
    (data._id as string) === currRefId
      ? data
      : data.variants &&
          data.variants.length > 0 &&
          data.variants.find(({ type }) => type === "reference")
        ? ((
            data.variants.find(({ type }) => type === "reference")
              ?.reference as ContentReferenceVariantDocument[]
          )?.find(
            ({ reference }) =>
              ((reference as ContentDocument)._id as string) === currRefId
          )?.reference as ContentDocument) || data
        : data;

  useEffect(() => {
    const isCustomSelected = currCustomId !== baseCustomVariantId;
    if (
      isCustomSelected &&
      data.variants &&
      data.variants.length > 0 &&
      data.variants.filter(({ type }) => type === "custom").length > 0
    ) {
      let relatedVariantLabel = data.variants
        .filter(({ type }) => type === "custom")
        .map(({ custom }) =>
          custom
            ? custom.variants.map(({ _id, label, value }) => ({
                _id: _id as string,
                label: label || "",
                value
              }))
            : undefined
        )
        .filter((x) => x !== undefined)
        .reduce((arr, val) => (arr = [...arr, ...val]), [])
        .find(({ _id }) => _id === currCustomId);

      if (
        relatedVariantLabel !== undefined &&
        relatedVariantLabel.label.length === 0
      ) {
        const mentionedUnit =
          data.variants
            .filter(({ type }) => type === "custom")
            .map(({ custom }) =>
              custom && custom.unit
                ? (custom.unit as UnitDocument).abbr
                : undefined
            )
            .filter((x) => x !== undefined)
            .at(0) || "";

        relatedVariantLabel = {
          ...relatedVariantLabel,
          label: `${relatedVariantLabel.value ? `${relatedVariantLabel.value} ${mentionedUnit}` : ""}`
        };
      }

      const relatedPriceDocument = data.variants
        .filter(({ type }) => type === "custom")
        .map(({ custom }) =>
          custom
            ? custom.variants.map(({ _id, price }) => ({
                _id: _id as string,
                price
              }))
            : undefined
        )
        .filter((x) => x !== undefined)
        .reduce((arr, val) => (arr = [...arr, ...val]), [])
        .find(({ _id }) => _id === currCustomId);

      if (relatedPriceDocument)
        setCustomVariantDetails((prev) => ({
          name: relatedVariantLabel?.label || "",
          price: relatedPriceDocument.price
        }));
    } else setCustomVariantDetails((prev) => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currCustomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) =>
        getDaysHrsMinsSecs(
          getFutureDate(
            data.delivery
              ? (
                  (data.delivery as ContentDeliveryDocument)
                    .processingTime as ProcessingTimeDocument
                ).hours
              : 0
          )
        )
      );
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoToSimilarProducts = () => {
    if (relatedContents && relatedContents.length > 0)
      scrollToSection({
        targetId: similarProductId,
        behavior: "smooth",
        align: "start",
        afterScroll: () => {}
      });
  };

  const reviews: string[] =
    data.quality &&
    data.quality.review &&
    (data.quality.review.group as ReviewGroupDocument).reviews.length > 0
      ? (data.quality.review.group as ReviewGroupDocument).reviews
      : [];

  const webpageUrl = `${DOMAIN}${data.slug.startsWith("/") ? data.slug : "/" + data.slug}`;

  const schemaContentData = {
    currency: "INR",
    price: `${data.price ? data.price.base.price : 0}`,
    rating: {
      count: data.quality?.rating?.count || 526,
      avgRating: data.quality?.rating?.value || 4.9
    },
    sku: data.sku,
    url: webpageUrl,
    validUntil: "31 Dec 2500",
    reviews: [],
    description: ""
  };

  const schemaData: SchemaDataType = {
    Content: {
      breadcrumbs: breadcrumbs
        ? [
            { label: "Homepage", url: "/" },
            ...breadcrumbs.map(({ label, link }) => ({
              label,
              url: `${DOMAIN}${link}`
            }))
          ]
        : [],
      webpage: {
        name: data.name,
        alternateName: data.name,
        image: (data.media.primary as ImageDocument).url,
        url: webpageUrl,
        productDetails: schemaContentData
      },
      content: {
        ...schemaContentData,
        image: (data.media.primary as ImageDocument).url,
        name: data.name
      }
    }
  };

  return (
    <>
      {/* SCHEMA ORG ========================================================= */}
      <SchemaOrgScripts
        pageType="Content"
        data={schemaData}
        url={webpageUrl}
      />

      {/* MAIN PRODUCT ======================================================== */}
      <ProductGridStructure>
        {/* <MaxWidthWrapper
          className={`bg-ivory-1 shadow-md z-50 sm:hidden !px-3.5 !py-3`}
        >
          <SelectCity variant="header-2nd-row" />
        </MaxWidthWrapper> */}

        <div
          id={"content-page"}
          className="h-full relative flex flex-col justify-between max-sm:sticky max-sm:top-0 max-sm:z-10 max-sm:bg-white "
        >
          {/* IMAGES HERE -------------------------------------------- */}
          <Drawer>
            <ContentImages
              images={[
                selectedContentData.media.primary as ImageDocument,
                ...(selectedContentData.media.gallery as ImageDocument[])
              ].map(({ url, alt, defaultAlt }) => ({
                url,
                alt: alt || defaultAlt
              }))}
              onSimilarProductsClick={
                isMobile ? () => {} : handleGoToSimilarProducts
              }
              viewSimilar={
                relatedContents && relatedContents.length > 0 ? true : false
              }
            />
            <DrawerContent className="rounded-t-3xl pt-2.5 z-[996]">
              <ProductOthersStructure
                title={
                  <OtherContentTitle
                    title="Similar Products"
                    id={similarProductId}
                    className="max-sm:!pl-2.5"
                  />
                }
              >
                <FrontendProductTiles
                  productList={relatedContents?.length ? relatedContents : []}
                  type="scrollable"
                />
              </ProductOthersStructure>
            </DrawerContent>
          </Drawer>
        </div>

        {/* ===[ MAJOR DETAILS ]===================================================== */}
        <ContentDetails
          details={selectedContentData}
          primaryImage={{
            url: (selectedContentData.media.primary as ImageDocument).url,
            alt:
              (selectedContentData.media.primary as ImageDocument).alt ||
              (selectedContentData.media.primary as ImageDocument).defaultAlt ||
              ""
          }}
          showServingInfo={type === "product" ? true : false}
          relatedCoupons={relatedCoupons}
          selectedReference={currRefId}
          selectedCustom={currCustomId}
          isReferenceActive={currRefId !== (data._id as string)}
          contentAvailability={data.availability!}
          onSelectReference={(selectedRefId: string) =>
            setCurrRefId((prev) => selectedRefId)
          }
          onSelectCustom={(selectedCustomId: string) =>
            setCurrCustomId((prev) => selectedCustomId)
          }
          referenceDocuments={data.variants?.filter(
            ({ type }) => type === "reference"
          )}
          customVariantDetails={customVariantDetails}
          customizationImages={customizationImages}
          onChangeCustomizationImages={setCustomizationImages}
          timer={timer}
        />
      </ProductGridStructure>

      {/* REVIEWS ======================================================== */}
      {reviews && reviews.length > 0 ? (
        <ProductOthersStructure
          className="sm:pt-7"
          title={<ContentReviewsTitle title="Reviews" />}
        >
          <BoxTheme
            className="!pt-3 !pb-1"
            excludeBox
          >
            <FrontendContentReviews
              availableReviewImages={[]}
              content={{
                _id: data._id as string,
                reviews,
                showReviews: CONTENT_PAGE_REVIEW_LIMIT
              }}
            />
          </BoxTheme>
        </ProductOthersStructure>
      ) : (
        <></>
      )}

      {/* OTHER PRODUCTS ======================================================== */}
      {relatedContents && relatedContents.length > 0 ? (
        <ProductOthersStructure
          title={
            <OtherContentTitle
              title="Similar Products"
              id={similarProductId}
            />
          }
        >
          <BoxTheme className="px-1">
            <FrontendProductTiles
              productList={relatedContents}
              type="scrollable"
            />
          </BoxTheme>
        </ProductOthersStructure>
      ) : (
        <></>
      )}

      {relatedAITagsContents && relatedAITagsContents.length > 0 ? (
        <ProductOthersStructure
          title={<OtherContentTitle title="Related Products" />}
        >
          <BoxTheme className="px-1">
            <FrontendProductTiles
              productList={relatedAITagsContents}
              type="scrollable"
            />
          </BoxTheme>
        </ProductOthersStructure>
      ) : (
        <></>
      )}

      {primaryCategoryRelatedContents &&
      primaryCategoryRelatedContents.length > 0 ? (
        <ProductOthersStructure
          title={<OtherContentTitle title="Handpicked For You" />}
        >
          <BoxTheme className="px-1">
            <FrontendProductTiles
              productList={primaryCategoryRelatedContents}
              type="scrollable"
            />
          </BoxTheme>
        </ProductOthersStructure>
      ) : (
        <></>
      )}

      {/* bottom spacing ------------------------------------------------ */}
      <div className="h-10" />
    </>
  );
}

const ProductGridStructure = ({ children }: { children: Children }) => {
  return (
    <section className="relative max-sm:bg-white grid grid-cols-1 sm:grid-cols-[590px_auto] sm:pb-5 gap-0 sm:gap-x-1.5 sm:gap-y-5 items-start justify-stretch">
      {children}
    </section>
  );
};

const ProductOthersStructure = ({
  title,
  children,
  gap,
  className
}: {
  title: JSX.Element;
  children: Children;
  gap?: string;
  className?: ClassNameType;
}) => {
  return (
    <ParentContainer>
      <section
        className={`relative flex flex-col justify-start ${gap ? gap : "gap-3 sm:gap-6"} ${className || ""}`}
      >
        {title}
        {children}
      </section>
    </ParentContainer>
  );
};
