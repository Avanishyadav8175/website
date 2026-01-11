/* eslint no-use-before-define: 0 */
"use client";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// components
import { GoogleAnalytics } from "@next/third-parties/google";

import { BreadcrumbsType } from "@/common/types/types";
import { useEffect, useId, useRef, useState } from "react";
import { ContentsSortType } from "../../CategoryList/static/types";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { BannerCarouselType } from "@/components/(frontend)/global/_Templates/BannerCarousel/static/types";
import { BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import { Banners } from "@/components/(frontend)/global/_Templates/BannerCarousel/BannerCarouselNew";
import FrontendCategoryListTitle from "../../CategoryList/components/ListTitle/ListTitle";
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import CustomTypedContent from "@/components/(frontend)/global/_Templates/CustomTypedContent/CustomTypedContent";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
import Categories from "@/components/(frontend)/global/_Templates/Tiles/CategoryTiles/UpdatedCategoryTiles";
import { ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import Input from "@/lib/Forms/Input/Input";
import { CATEGORY_PAGE_SORT_TYPES } from "../../CategoryList/static/data";
import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";
import { Loader2 } from "lucide-react";
import FrontendContentReviews from "../../Content/components/Others/ContentReviews/ContentReviews";
import { CATEGORY_PAGE_REVIEW_LIMIT } from "@/common/constants/limits";
import { BASE_HOME_BG_COLOR } from "../../Home/static/pallette";
import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import CategorySortAndFilter from "@/components/(frontend)/global/StickyBottomNavbar/StickyBottomNavbar";
import {
  API_CATEGORIES_MORE_PRODUCTS,
  API_PAGE_PAGE_MORE_PRODUCTS,
  API_PAGE_SUBPAGE_MORE_PRODUCTS
} from "@/common/apiHandlers/(frontend)/apiLinks";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { decode } from "he";
import { SchemaDataType } from "@/common/types/seoTypes";
import { DOMAIN } from "@/common/constants/domain";
import { usePathname } from "next/navigation";
import { XApiKey } from "@/common/constants/apiKey";

export default function FrontendCategoriesTestPage({
  data,
  breadcrumbs,
  pageType,
  initialCityId
}: {
  data: any;
  breadcrumbs: BreadcrumbsType[];
  pageType: "category" | "page" | "subpage";
  initialCityId?: string | null;
}) {
  const {
    isReady,
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  const [currSort, setCurrSort] = useState<ContentsSortType>("popularity");
  const [isSortSwitched, setIsSortSwitched] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<boolean>(true);
  const [goToTop, setGoToTop] = useState<boolean>(false);
  const [prevCityId, setPrevCityId] = useState<string | null>(
    initialCityId || (selectedCity ? (selectedCity._id as string) : null)
  );
  const [contents, setContents] = useState<Partial<ContentDocument>[]>(
    data.contents as Partial<ContentDocument>[]
  );
  const [offset, setOffset] = useState<number>(1);

  const mobileFilterRef = useRef(null);
  const loadMoreRef = useRef(null);

  const topId = useId();

  useEffect(() => {
    if (!cooldown) {
      // setTimeout(() => setCooldown((prev) => true), 50);
      setCooldown((prev) => true);
    }
  }, [cooldown]);

  // STICKY BEHAVIOR OF QUICK LINKS ------------------
  useEffect(() => {
    // ===[ OBSERVE QUICK LINKS ]=========================================
    const observeMobileFilter = () => {
      const stickyFilterDiv = mobileFilterRef.current;
      if (!stickyFilterDiv) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              alert("DONT");
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 1 }
      );

      observer.observe(stickyFilterDiv);
    };

    const observeLoadMore = () => {
      const loadMoreDiv = loadMoreRef.current;
      if (!loadMoreDiv) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && scrollY > innerHeight / 2) {
              setLoadMore((prev) => true);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(loadMoreDiv);
    };

    observeMobileFilter();
    observeLoadMore();
  }, []);

  // LOAD MORE PRODUCTS ------------------
  useEffect(() => {
    if (loadMore && !allLoaded && scrollY >= innerHeight / 2) {
      if (cooldown) {
        setCooldown((prev) => false);
        // call api to load more-products here...
        if (pageType === "category") {
          fetch(
            API_CATEGORIES_MORE_PRODUCTS({
              categoryId: data._id as string,
              offset,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from load more");
              setContents((prev) => [...prev, ...data]);
              if (data && data.length > 0) setOffset((prev) => prev + 1);
              else setAllLoaded((prev) => true);
            });
        } else if (pageType === "page") {
          fetch(
            API_PAGE_PAGE_MORE_PRODUCTS({
              topicId: data._id as string,
              categoryId: data.categoryId || "",
              offset,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from load more");
              setContents((prev) => [...prev, ...data]);
              if (data && data.length > 0) setOffset((prev) => prev + 1);
              else setAllLoaded((prev) => true);
            });
        } else if (pageType === "subpage") {
          fetch(
            API_PAGE_SUBPAGE_MORE_PRODUCTS({
              subTopicId: data._id as string,
              topicId: data.topicId || "",
              categoryId: data.categoryId || "",
              offset,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from load more");
              setContents((prev) => [...prev, ...data]);
              if (data && data.length > 0) setOffset((prev) => prev + 1);
              else setAllLoaded((prev) => true);
            });
        }
      }
    }
    setLoadMore((prev) => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore]);

  useEffect(() => {
    if (data && data.totalCount && contents.length === data.totalCount)
      setAllLoaded((prev) => true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);

  useEffect(() => {
    if (!allLoaded && isSortSwitched) {
      // setContents((prev) => []);
      // handleLoadMore(1);
      if (cooldown) {
        setCooldown((prev) => false);
        // call api to load more-products here...
        if (pageType === "category") {
          fetch(
            API_CATEGORIES_MORE_PRODUCTS({
              categoryId: data._id as string,
              offset: 0,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from sorting");
              setContents((prev) => data);
              setOffset((prev) => 1);
            });
        } else if (pageType === "page") {
          fetch(
            API_PAGE_PAGE_MORE_PRODUCTS({
              topicId: data._id as string,
              categoryId: data.categoryId || "",
              offset: 0,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from sorting");
              setContents((prev) => data);
              setOffset((prev) => 1);
            });
        } else if (pageType === "subpage") {
          fetch(
            API_PAGE_SUBPAGE_MORE_PRODUCTS({
              subTopicId: data._id as string,
              topicId: data.topicId || "",
              categoryId: data.categoryId || "",
              offset: 0,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from sorting");
              setContents((prev) => data);
              setOffset((prev) => 1);
            });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSort]);

  useEffect(() => {
    if (
      !(selectedCity === null && prevCityId === null) &&
      !(prevCityId === selectedCity?._id)
    )
      if (!allLoaded && cooldown) {
        // setContents((prev) => []);
        setCooldown((prev) => false);

        if (pageType === "category") {
          fetch(
            API_CATEGORIES_MORE_PRODUCTS({
              categoryId: data._id as string,
              offset: 0,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from city change");
              setContents((prev) => data);
              setOffset((prev) => 1);
            });
        } else if (pageType === "page") {
          fetch(
            API_PAGE_PAGE_MORE_PRODUCTS({
              topicId: data._id as string,
              categoryId: data.categoryId || "",
              offset: 0,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from city change");
              setContents((prev) => data);
              setOffset((prev) => 1);
            });
        } else if (pageType === "subpage") {
          fetch(
            API_PAGE_SUBPAGE_MORE_PRODUCTS({
              subTopicId: data._id as string,
              topicId: data.topicId || "",
              categoryId: data.categoryId || "",
              offset: 0,
              sort: currSort,
              cityId: selectedCity ? (selectedCity._id as string) : undefined
            }),
            {
              headers: { "x-api-key": XApiKey }
            }
            // { cache: "no-cache" }
          )
            .then(async (data) => await data.json())
            .then((data) => {
              // console.log("from city change");
              setContents((prev) => data);
              setOffset((prev) => 1);
            });
        }
      }

    if (
      (prevCityId === null && selectedCity !== null) ||
      (selectedCity === null && prevCityId !== null) ||
      selectedCity?._id !== prevCityId
    )
      setPrevCityId((prev) =>
        selectedCity ? (selectedCity._id as string) : null
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  // GO TO TOP ----------------------------
  /* useEffect(() => {
    if (goToTop) {
      const topElement = document.getElementById(topId) as HTMLElement;
      if (topElement) {
        topElement.scrollIntoView({
          behavior: "smooth"
        });
      }
      setGoToTop((prev) => false);
    }
  }, [goToTop, topId]); */

  const avgRating: number =
    data.avgReviews && data.totalCount
      ? Number((data.avgReviews.totalRatingValue / data.totalCount).toFixed(1))
      : 5.0;

  const totalReviews: number = data.avgReviews
    ? data.avgReviews.totalRatingCount || 20
    : 20;

  // @ts-ignore
  const { maxPrice, minPrice } = (() => {
    // @ts-ignore
    let minPrice = contents[0].price.price;
    // @ts-ignore
    let maxPrice = contents[0].price.price;

    for (let i = 1; i < contents.length; i++) {
      // @ts-ignore
      const price = contents[i].price.price;

      if (minPrice > price) {
        minPrice = price;
      }

      if (maxPrice < price) {
        maxPrice = price;
      }
    }

    return { minPrice, maxPrice };
  })();

  // ORIGINAL ----------------
  // const banners: BannerCarouselType | undefined = data.media?.banner
  const banners: BannerCarouselType | undefined =
    data.media?.banner?.images?.length > 0
      ? ({
          elements: (data.media.banner as BannerDocument).images
            .map(({ desktop, mobile, path }) =>
              path
                ? {
                    image: {
                      desktop: {
                        alt: "",
                        // url: (desktop as ImageDocument).url,
                        // @ts-ignore
                        url: desktop?.url || undefined
                      },
                      mobile: {
                        alt: "",
                        // url: (mobile as ImageDocument).url,
                        // @ts-ignore
                        url: mobile?.url || undefined
                      }
                    },
                    isLink: true,
                    link: path
                  }
                : {
                    image: {
                      desktop: {
                        alt: "",
                        // url: (desktop as ImageDocument).url,
                        // @ts-ignore
                        url: desktop?.url || undefined
                      },
                      mobile: {
                        alt: "",
                        // url: (mobile as ImageDocument).url,
                        // @ts-ignore
                        url: mobile?.url || undefined
                      }
                    },
                    isLink: false
                  }
            )
            .filter(
              ({ image: { desktop, mobile } }) => desktop.url && mobile.url
            ),
          autoScroll: true,
          loop: true,
          scrollAfter: 7000
        } as BannerCarouselType)
      : undefined;

  const reviews: { review: string; area?: string }[] =
    data.personalizedReviews && data.personalizedReviews.length > 0
      ? data.personalizedReviews
      : [];

  const categoryList = data?.media?.quickLinks?.map(
    // @ts-ignore
    ({ _id, label, path, image }) =>
      image
        ? {
            _id: _id as string,
            link: path,
            label: label || "",
            image: {
              url: (image as ImageDocument).url || "",
              alt:
                (image as ImageDocument).alt ||
                (image as ImageDocument).defaultAlt ||
                ""
            }
          }
        : {
            _id: _id as string,
            link: path,
            label: label || "",
            image: { url: "", alt: "" }
          }
  );

  const hasNoImages: boolean = true;

  /* const hasNoImages: boolean = categoryList
    ? categoryList
      .filter((x) => x !== undefined && x.image !== undefined && x.image.url !== undefined)
      .map((item) => (item.image.url as string | undefined))
      .reduce((acc, val) => (acc ||= val.length === 0), false)
    : false; */

  const currPath = usePathname();

  const schemaData: { url: string; data: SchemaDataType } = {
    url: `${DOMAIN}${currPath}`,
    data: {
      Category: {
        name: data?.name || data?.info?.heading || "",
        breadcrumbs: [
          ...breadcrumbs.map(({ label, link }) => ({ label, url: link }))
        ],
        faqs: data?.seo?.faqs?.length
          ? data.seo.faqs.map((seo: { question: string; answer: string }) => ({
              q: seo.question,
              a: seo.answer
            }))
          : [],
        product: {
          name: data?.name || data?.info?.heading || "",
          description: "",
          highPrice: maxPrice,
          lowPrice: minPrice,
          ratingCount: totalReviews,
          ratingValue: avgRating,
          reviewCount: Math.ceil(totalReviews * 0.2),
          offerCount: 100
        }
        // contents:
        //   data?.contents?.slice(0, 24)?.map((content: any) => {
        //     const { name, sku, media, quality, slug, price } = content;

        //     return {
        //       name,
        //       image: media?.primary?.url || "",
        //       sku,
        //       url: `${DOMAIN}${slug ? (slug[0] === "/" ? slug : "/" + slug) : ""}`,
        //       price: `${price.price}`,
        //       currency: "INR",
        //       validUntil: "31 Dec 2500",
        //       rating: {
        //         count: quality?.rating?.count || 526,
        //         avgRating: quality?.rating?.value || 4.9
        //       },
        //       reviews: []
        //     };
        //   }) || []
      }
    }
  };

  return (
    <>
      {/* FILTER COLUMN: [[ DO NOT DELETE THIS ]] ------------------------------------------ */}
      {/* <FrontendCategoryFilterLayout title="Filters">
        <FrontendCategoryListFilter filters={dummyFilters} />
      </FrontendCategoryFilterLayout> */}

      {/* SCHEMA ORG ------------------------------------------ */}
      <SchemaOrgScripts
        data={schemaData.data}
        pageType="Category"
        url={schemaData.url}
      />

      {/* BANNERS ------------------------------------------ */}
      {data.media &&
      data.media.banner &&
      banners &&
      banners.elements.length > 0 ? (
        <div className="py-2 max-sm:px-3.5">
          <Banners
            {...({ ...banners, ratioType: "default" } as BannerCarouselType)}
          />
        </div>
      ) : (
        <></>
      )}

      {/* TITLE ------------------------------------------ */}
      <FrontendCategoryListTitle
        useH1
        title={data?.info?.heading || ""}
        totalRating={avgRating.toFixed(1)}
        totalReviews={totalReviews}
        extraPadding={data.media && data.media.banner && banners ? true : false}
      />

      {/* CUSTOM TEXT ------------------------------------------ */}
      {data.info && data.info.topContent && data.info.topContent.length > 0 ? (
        <HorizontalSpacing
          className="bg-ivory-1 max-sm:px-3.5"
          inCategoryPage
        >
          <CustomTypedContent
            content={decode(data.info.topContent as string)}
          />
        </HorizontalSpacing>
      ) : (
        <></>
      )}

      {/* RELATED CATEGORIES ------------------------------------------ */}
      {data.relatedCategories &&
        // data.relatedCategories.show &&
        data.relatedCategories.categories &&
        data.relatedCategories.categories.length > 0 && (
          <div className="pt-5 max-sm:px-3.5">
            <BoxTheme>
              <Categories
                scrollable={true}
                asCategoryPageQuickLink
                columns={6}
                shape="circle"
                categoryList={(
                  data.relatedCategories.categories as ContentCategoryDocument[]
                ).map(({ _id, name, media: { icon }, slug }) =>
                  icon
                    ? {
                        _id: _id as string,
                        link: `/${slug}`,
                        label: name,
                        image: {
                          url: (icon as ImageDocument).url || "",
                          alt:
                            (icon as ImageDocument).alt ||
                            (icon as ImageDocument).defaultAlt ||
                            ""
                        }
                      }
                    : {
                        _id: _id as string,
                        link: `/${slug}`,
                        label: name,
                        image: { alt: "", url: "" }
                      }
                )}
              />
            </BoxTheme>
          </div>
        )}

      {/* QUICK LINKS ------------------------------------------ */}
      {!hasNoImages &&
        data.media &&
        data.media?.quickLinks &&
        data.media?.quickLinks.length > 0 &&
        categoryList && (
          <div className=" max-sm:px-3.5">
            <BoxTheme className="mt-4">
              <Categories
                scrollable={true}
                asCategoryPageQuickLink
                columns={6}
                shape="square"
                categoryList={categoryList}
              />
            </BoxTheme>
          </div>
        )}

      {/* PRODUCTS ------------------------------------------ */}
      <div className="flex max-sm:flex-col items-start sm:items-center justify-start sm:justify-between py-5 max-sm:px-3.5">
        <div
          id={topId}
          className="text-lg sm:text-xl font-medium max-1200:px-2 whitespace-nowrap text-charcoal-3/80"
        >
          {data.totalCount || 0} Products
        </div>
        <div className="max-sm:hidden relative flex items-center justify-end max-w-[200px] *:whitespace-nowrap overflow-x-scroll scrollbar-hide w-[100dvw] text-sm">
          <label
            htmlFor="sortType"
            className="mr-1 max-sm:hidden"
          >
            Sort By:
          </label>
          <Input
            id="sortType"
            type="dropdown"
            name="sortType"
            errorCheck={false}
            validCheck={false}
            isRequired={false}
            nullOption={false}
            options={CATEGORY_PAGE_SORT_TYPES.map(({ label, sortBy }) => ({
              label,
              value: sortBy
            }))}
            customValue={{
              setValue: (sortBy) => {
                if (sortBy !== "popularity" && !isSortSwitched)
                  setIsSortSwitched((prev) => true);
                setCurrSort((prev) => sortBy as ContentsSortType);
              },
              value: currSort
            }}
            customStyle="outline-none border-none rounded-xl transition-all duration-300 cursor-pointer bg-charcoal-3/5 hover:bg-charcoal-3/10 px-3.5 py-2"
          />
        </div>
      </div>

      <div className="max-sm:px-3.5">
        <BoxTheme isContent>
          {hasNoImages &&
            data.media &&
            data.media?.quickLinks &&
            data.media?.quickLinks.length > 0 &&
            categoryList && (
              <div className="pt-3.5 pb-2 max-sm:px-3 sm:pt-2 sm:pb-5">
                <Categories
                  scrollable={true}
                  asCategoryPageQuickLink
                  columns={6}
                  shape="square"
                  categoryList={categoryList}
                />
              </div>
            )}

          <FrontendProductTiles
            inCategoryPage
            currSort={currSort}
            extraCurved={true}
            sync
            productList={
              allLoaded
                ? (contents.slice().sort((a, b) => {
                    if (currSort === "latest") {
                      const dateA = a.updatedAt
                        ? new Date(a.updatedAt).getTime()
                        : -Infinity;
                      const dateB = b.updatedAt
                        ? new Date(b.updatedAt).getTime()
                        : -Infinity;

                      return dateB - dateA;
                    } else if (currSort === "popularity") {
                      const ratingA =
                        a.quality && a.quality.rating
                          ? a.quality.rating.count
                          : 0;
                      const ratingB =
                        b.quality && b.quality.rating
                          ? b.quality.rating.count
                          : 0;

                      return ratingB - ratingA;
                    }

                    // @ts-ignore
                    const priceA = a.price.price || 0;
                    // @ts-ignore
                    const priceB = b.price.price || 0;

                    return currSort === "high-to-low"
                      ? priceB - priceA
                      : priceA - priceB;
                  }) as ContentDocument[])
                : (contents as ContentDocument[])
            }
          />
        </BoxTheme>
      </div>

      <div
        ref={loadMoreRef}
        className={`flex items-center rounded-lg justify-center gap-2 w-full mt-8 py-2 text-lg text-center transition-all duration-300 text-charcoal-3/80 ${allLoaded ? "hidden" : ""}`}
      >
        <Loader2
          strokeWidth={1.5}
          width={19}
          height={19}
          className="animate-spin"
        />
        <span>Loading more...</span>
      </div>

      {/* REVIEWS -------------------------------------------- */}
      {reviews && reviews.length > 0 ? (
        <div className="max-sm:px-3.5 pt-16 space-y-4">
          <FrontendCategoryListTitle
            title={"Customer Reviews"}
            onlyTitle
            totalRating={0}
            totalReviews={0}
          />
          <BoxTheme className="!px-0">
            <FrontendContentReviews
              availableReviewImages={[]}
              content={{
                _id: data._id as string,
                reviews:
                  reviews.length > 0 ? reviews.map((rvw) => rvw.review) : [],
                areas:
                  reviews.length > 0
                    ? reviews.map((rvw) => rvw.area || "")
                    : undefined,
                showReviews: CATEGORY_PAGE_REVIEW_LIMIT
              }}
            />
          </BoxTheme>
        </div>
      ) : (
        <></>
      )}

      {/* FILTERS FOR MOBILE ------------------------------------------ */}
      {/* <div
        ref={mobileFilterRef}
        onClick={() => setOpenFilter((prev) => true)}
        className=" bg-sienna brightness-75 contrast-150 text-ivory-1 py-2.5 px-3.5 rounded-lg aspect-square font-light flex items-center justify-center gap-2.5 sm:hidden sticky bottom-2 left-[500dvw] -translate-x-2 w-fit z-[600]"
      >
        <FilterIcon
          strokeWidth={1.5}
          width={17}
          height={17}
        />
      </div> */}

      {/* CUSTOM TEXT ------------------------------------------ */}
      {data.info &&
      data.info.bottomContent &&
      data.info.bottomContent.length > 0 ? (
        <HorizontalSpacing
          className={`${BASE_HOME_BG_COLOR} z-[820] pt-10 `}
          inCategoryPage
        >
          <BoxTheme>
            <div className="px-1">
              <CustomTypedContent
                content={decode(data.info.bottomContent as string)}
              />
            </div>
          </BoxTheme>
        </HorizontalSpacing>
      ) : (
        <></>
      )}

      {/* FAQs ------------------------------------------ */}
      {data?.seo?.faqs?.length > 0 && (
        <HorizontalSpacing
          className={`${BASE_HOME_BG_COLOR} z-[810] pt-10 `}
          inCategoryPage
        >
          <FrontendCategoryListTitle
            title={"Frequently Asked Questions"}
            onlyTitle
            totalRating={0}
            totalReviews={0}
          />
          <BoxTheme className="my-4">
            <div className="px-2">
              <FAQs
                // @ts-ignore
                faqData={data?.seo?.faqs?.map(({ _id, question, answer }) => ({
                  _id: _id as string,
                  question,
                  answer
                }))}
              />
            </div>
          </BoxTheme>
        </HorizontalSpacing>
      )}

      {/* ====[ DIALOG POPUP FILTERS ]================================================= */}
      {/* <Dialog
        open={openFilter}
        onOpenChange={setOpenFilter}
      >
        <DialogContent className="p-0 sm:hidden">
          <div className="relative w-device h-device bg-gradient-to-b from-sienna-3/30 via-20% via-ivory-1 to-ivory-1 flex flex-col justify-start overflow-y-scroll scrollbar-hide">
            <HorizontalSpacing className="flex flex-col justify-start h-full">
              <div className="text-xl font-medium pt-7 pb-3 text-sienna brightness-90">
                Apply Filters
              </div>
              <FrontendCategoryListFilter filters={dummyFilters} />
            </HorizontalSpacing>

            <HorizontalSpacing className="pb-3 sticky bottom-0">
              <div
                className=" bg-sienna brightness-90 text-white rounded-md py-2.5 text-center"
                onClick={() => setOpenFilter((prev) => false)}
              >
                Apply
              </div>
            </HorizontalSpacing>
          </div>
        </DialogContent>
      </Dialog> */}

      <CategorySortAndFilter
        selectedSort={currSort}
        onSelectSort={(sort) => {
          if (sort !== "popularity" && !isSortSwitched)
            setIsSortSwitched((prev) => true);
          setCurrSort((prev) => sort as ContentsSortType);
        }}
      />

      <div
        className={`${BASE_HOME_BG_COLOR} w-full sm:hidden h-20 -mt-14 z-[90]`}
      />
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
