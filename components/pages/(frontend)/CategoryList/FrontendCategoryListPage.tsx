// "use client";
// import FrontendCategoryListTitle from "./components/ListTitle/ListTitle";
// import { useEffect, useId, useRef, useState } from "react";
// import { Banners } from "@/components/(frontend)/global/_Templates/BannerCarousel/BannerCarouselNew";
// import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
// import CustomTypedContent from "@/components/(frontend)/global/_Templates/CustomTypedContent/CustomTypedContent";
// import { ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
// import { ContentDocument } from "@/common/types/documentation/contents/content";
// import { ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";
// import { ContentRatingDocument } from "@/common/types/documentation/nestedDocuments/contentRating";
// import { BannerCarouselType } from "@/components/(frontend)/global/_Templates/BannerCarousel/static/types";
// import { BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
// import { ImageDocument } from "@/common/types/documentation/media/image";
// import { decodeHtmlEntities } from "@/common/helpers/generateStaticBlogData";
// import { TopicDocument } from "@/common/types/documentation/pages/topic";
// import { SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
// import { ContentsSortType } from "./static/types";
// import { CATEGORY_PAGE_SORT_TYPES } from "./static/data";
// import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
// import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";
// import CategorySortAndFilter from "@/components/(frontend)/global/StickyBottomNavbar/StickyBottomNavbar";
// import Input from "@/lib/Forms/Input/Input";
// import FrontendContentReviews from "../Content/components/Others/ContentReviews/ContentReviews";
// import Categories from "@/components/(frontend)/global/_Templates/Tiles/CategoryTiles/UpdatedCategoryTiles";
// import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
// import { Loader2 } from "lucide-react";
// import { CATEGORY_PAGE_REVIEW_LIMIT } from "@/common/constants/limits";
// import { BASE_HOME_BG_COLOR } from "../Home/static/pallette";
// import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
// import { usePathname } from "next/navigation";
// import { DOMAIN } from "@/common/constants/domain";
// import { SchemaDataType } from "@/common/types/seoTypes";
// import { ReviewDocument } from "@/common/types/documentation/dynamic/review";
// import moment from "moment";
// import { CustomerDocument } from "@/common/types/documentation/users/customer";
// import { getCityWiseContentPrices } from "@/common/helpers/getCityWiseContentPrices";
// import { BreadcrumbsType } from "@/common/types/types";
// import { useAppStates } from "@/hooks/useAppState/useAppState";
// import { CityDocument } from "@/common/types/documentation/presets/city";
// import { PincodeDocument } from "@/common/types/documentation/presets/pincode";
// // import { useLocation } from "@/hooks/useLocation/useLocation";

// export default function FrontendCategoryListPage({
//   contents,
//   data,
//   breadcrumbs
// }: {
//   data: ContentCategoryDocument | TopicDocument | SubTopicDocument;
//   contents: ContentDocument[];
//   breadcrumbs: BreadcrumbsType[];
// }) {
//   const {
//     isReady,
//     location: {
//       data: { selectedPincode },
//       methods: { onChangePincode }
//     }
//   } = useAppStates();

//   useEffect(() => {
//     if (
//       (isReady &&
//         !selectedPincode &&
//         ((data as TopicDocument)?.city as CityDocument)?.defaultPincode) ||
//       ((data as SubTopicDocument)?.city as CityDocument)?.defaultPincode
//     ) {
//       onChangePincode(
//         (((data as TopicDocument)?.city as CityDocument)
//           ?.defaultPincode as PincodeDocument) ||
//           (((data as SubTopicDocument)?.city as CityDocument)
//             ?.defaultPincode as PincodeDocument)
//       );
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isReady]);

//   const [bottomContent, setBottomContent] = useState<string>("");
//   const [topContent, setTopContent] = useState<string>("");
//   const [currSort, setCurrSort] = useState<ContentsSortType>("popularity");
//   const [loadMore, setLoadMore] = useState<boolean>(false);
//   const [goToTop, setGoToTop] = useState<boolean>(false);
//   const [noMoreContentsToLoad, setNoMoreContentsToLoad] =
//     useState<boolean>(false);
//   const mobileFilterRef = useRef(null);
//   const loadMoreRef = useRef(null);

//   const topId = useId();
//   const currPath = usePathname();
//   // const { selectedCity } = useLocation();

//   const [displayContents, setDisplayContents] = useState<number>(20);

//   const canLoadMore = displayContents < contents.length;

//   const handleLoadMore = () => {
//     if (canLoadMore) {
//       setDisplayContents((prev) => prev + 20);
//     } else setNoMoreContentsToLoad((prev) => true);
//   };

//   useEffect(() => {
//     // ===[ OBSERVE QUICK LINKS ]=========================================
//     const observeMobileFilter = () => {
//       const stickyFilterDiv = mobileFilterRef.current;
//       if (!stickyFilterDiv) return;

//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (!entry.isIntersecting) {
//               alert("DONT");
//             }
//           });
//         },
//         { root: null, rootMargin: "0px", threshold: 1 }
//       );

//       observer.observe(stickyFilterDiv);
//     };

//     const observeLoadMore = () => {
//       const loadMoreDiv = loadMoreRef.current;
//       if (!loadMoreDiv) return;

//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               setLoadMore((prev) => true);
//             }
//           });
//         },
//         { threshold: 0.5 }
//       );

//       observer.observe(loadMoreDiv);
//     };

//     observeMobileFilter();
//     observeLoadMore();
//   }, []);

//   useEffect(() => {
//     if (data.info && data.info.bottomContent !== undefined)
//       setBottomContent((prev) =>
//         decodeHtmlEntities(data.info.bottomContent as string)
//       );

//     if (data.info && data.info.topContent !== undefined)
//       setTopContent((prev) =>
//         decodeHtmlEntities(data.info.topContent as string)
//       );
//   }, [data.info]);

//   useEffect(() => {
//     if (loadMore) {
//       handleLoadMore();
//       setLoadMore((prev) => false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loadMore]);

//   // GO TO TOP ----------------------------
//   useEffect(() => {
//     if (goToTop) {
//       const topElement = document.getElementById(topId) as HTMLElement;
//       if (topElement) {
//         topElement.scrollIntoView({
//           behavior: "smooth"
//         });
//       }
//       setGoToTop((prev) => false);
//     }
//   }, [goToTop, topId]);

//   const avgRating =
//     contents && contents.length
//       ? contents
//           .filter((content) =>
//             content === undefined || content.quality === undefined
//               ? false
//               : true
//           )
//           .map(
//             ({ quality }) =>
//               (
//                 (quality as ContentQualityDocument)
//                   ?.rating as ContentRatingDocument
//               )?.value || 0
//           )
//           .reduce((total, rating) => (total += rating), 0) /
//         (contents.filter((content) =>
//           content !== undefined &&
//           content.quality &&
//           (
//             (content.quality as ContentQualityDocument)
//               .rating as ContentRatingDocument
//           )?.value > 0
//             ? true
//             : false
//         ).length || 1)
//       : 5;

//   const totalReviews =
//     contents && contents.length
//       ? contents
//           .filter((content) =>
//             content === undefined || content.quality === undefined
//               ? false
//               : true
//           )
//           .map(
//             ({ quality }) =>
//               (
//                 (quality as ContentQualityDocument)
//                   ?.rating as ContentRatingDocument
//               )?.count || 0
//           )
//           .reduce((total, count) => (total += count), 0)
//       : 20;

//   const banners: BannerCarouselType | undefined = data.media?.banner
//     ? ({
//         elements: (data.media.banner as BannerDocument).images.map(
//           ({ desktop, mobile, path }) =>
//             path
//               ? {
//                   image: {
//                     desktop: {
//                       alt: "",
//                       url: (desktop as ImageDocument).url
//                     },
//                     mobile: {
//                       alt: "",
//                       url: (mobile as ImageDocument).url
//                     }
//                   },
//                   isLink: true,
//                   link: path
//                 }
//               : {
//                   image: {
//                     desktop: {
//                       alt: "",
//                       url: (desktop as ImageDocument).url
//                     },
//                     mobile: {
//                       alt: "",
//                       url: (mobile as ImageDocument).url
//                     }
//                   },
//                   isLink: false
//                 }
//         ),
//         autoScroll: true,
//         loop: true,
//         scrollAfter: 7000
//       } as BannerCarouselType)
//     : undefined;

//   const reviews: { review: string; area?: string }[] =
//     data.personalizedReviews && data.personalizedReviews.length > 0
//       ? data.personalizedReviews
//       : [];

//   const categoryList = data?.media?.quickLinks?.map(
//     ({ _id, label, path, image }) =>
//       image
//         ? {
//             _id: _id as string,
//             link: path,
//             label: label || "",
//             image: {
//               url: (image as ImageDocument).url || "",
//               alt:
//                 (image as ImageDocument).alt ||
//                 (image as ImageDocument).defaultAlt ||
//                 ""
//             }
//           }
//         : {
//             _id: _id as string,
//             link: path,
//             label: label || "",
//             image: { url: "", alt: "" }
//           }
//   );

//   const hasNoImages: boolean = categoryList
//     ? categoryList
//         .map(({ image: { url } }) => url)
//         .filter((x) => x !== undefined)
//         .reduce((acc, val) => (acc ||= val.length === 0), false)
//     : false;

//   const schemaData: { url: string; data: SchemaDataType } = {
//     url: `${DOMAIN}${currPath}`,
//     data: {
//       Category: {
//         name: data.info.heading || "",
//         breadcrumbs: [
//           { label: "Homepage", url: "/" },
//           ...breadcrumbs.map(({ label, link }) => ({ label, url: link }))
//         ],
//         faqs:
//           data.seo.faqs.length > 0
//             ? data.seo.faqs.map(({ _id, question, answer }) => ({
//                 q: question,
//                 a: answer
//               }))
//             : [],
//         contents: contents.slice(0, 12).map((content) => {
//           const { name, sku, media, quality, slug, seoMeta } = content;

//           return {
//             name,
//             image: (media.primary as ImageDocument).url,
//             sku,
//             url: `${DOMAIN}${slug[0] === "/" ? slug : "/" + slug}`,
//             price: `${getCityWiseContentPrices({ city: null, content }).price}`,
//             currency: "INR",
//             validUntil: "31 Dec 2500",
//             rating: {
//               count: quality?.rating?.count || 526,
//               avgRating: quality?.rating?.value || 4.9
//             },
//             description: seoMeta?.description || "",
//             reviews:
//               (quality &&
//                 quality.review &&
//                 quality.review.reviews &&
//                 (quality.review.reviews as ReviewDocument[]).map(
//                   ({ rating, customer, review, createdAt }) => ({
//                     name: (customer as CustomerDocument).name || "User",
//                     saidReview: review || "Good product.",
//                     date: moment(createdAt).format("DD MM YYYY"),
//                     rated: rating,
//                     maxRate: rating
//                   })
//                 )) ||
//               []
//           };
//         })
//       }
//     }
//   };

//   return (
//     <>
//       {/* FILTER COLUMN ------------------------------------------ */}
//       {/* <FrontendCategoryFilterLayout title="Filters">
//         <FrontendCategoryListFilter filters={dummyFilters} />
//       </FrontendCategoryFilterLayout> */}

//       <SchemaOrgScripts
//         data={schemaData.data}
//         pageType="Category"
//         url={schemaData.url}
//       />

//       {/* BANNERS ------------------------------------------ */}
//       {data.media && data.media.banner ? (
//         <div className="py-2 max-sm:px-3.5">
//           <Banners
//             {...({ ...banners, ratioType: "default" } as BannerCarouselType)}
//           />
//         </div>
//       ) : (
//         <></>
//       )}

//       {/* TITLE ------------------------------------------ */}
//       <FrontendCategoryListTitle
//         useH1
//         title={data.info.heading || ""}
//         totalRating={avgRating.toFixed(1)}
//         totalReviews={totalReviews}
//         extraPadding={data.media && data.media.banner && banners ? true : false}
//       />

//       {/* CUSTOM TEXT ------------------------------------------ */}
//       {data.info && data.info.topContent && data.info.topContent.length > 0 ? (
//         <HorizontalSpacing
//           className="bg-ivory-1 max-sm:px-3.5"
//           inCategoryPage
//         >
//           <CustomTypedContent content={topContent} />
//         </HorizontalSpacing>
//       ) : (
//         <></>
//       )}

//       {/* RELATED CATEGORIES ------------------------------------------ */}
//       {data.relatedCategories &&
//         // data.relatedCategories.show &&
//         data.relatedCategories.categories &&
//         data.relatedCategories.categories.length > 0 && (
//           <div className="pt-5">
//             <BoxTheme>
//               <Categories
//                 scrollable={true}
//                 asCategoryPageQuickLink
//                 columns={6}
//                 shape="circle"
//                 categoryList={(
//                   data.relatedCategories.categories as ContentCategoryDocument[]
//                 ).map(({ _id, name, media: { icon }, slug }) =>
//                   icon
//                     ? {
//                         _id: _id as string,
//                         link: `/${slug}`,
//                         label: name,
//                         image: {
//                           url: (icon as ImageDocument).url || "",
//                           alt:
//                             (icon as ImageDocument).alt ||
//                             (icon as ImageDocument).defaultAlt ||
//                             ""
//                         }
//                       }
//                     : {
//                         _id: _id as string,
//                         link: `/${slug}`,
//                         label: name,
//                         image: { alt: "", url: "" }
//                       }
//                 )}
//               />
//             </BoxTheme>
//           </div>
//         )}

//       {/* QUICK LINKS ------------------------------------------ */}
//       {!hasNoImages &&
//         data.media &&
//         data.media?.quickLinks &&
//         data.media?.quickLinks.length > 0 &&
//         categoryList && (
//           <div className=" max-sm:px-3.5">
//             <BoxTheme className="mt-4">
//               <Categories
//                 scrollable={true}
//                 asCategoryPageQuickLink
//                 columns={6}
//                 shape="square"
//                 categoryList={categoryList}
//               />
//             </BoxTheme>
//           </div>
//         )}

//       {/* PRODUCTS ------------------------------------------ */}
//       <div className="flex max-sm:flex-col items-start sm:items-center justify-start sm:justify-between py-5 max-sm:px-3.5">
//         <div
//           id={topId}
//           className="text-lg sm:text-xl font-medium max-1200:px-2 whitespace-nowrap text-charcoal-3/80"
//         >
//           {contents.length || 0} Products
//         </div>
//         <div className="max-sm:hidden relative flex items-center justify-end max-w-[200px] *:whitespace-nowrap overflow-x-scroll scrollbar-hide w-[100dvw] text-sm">
//           <span className="mr-1 max-sm:hidden">Sort By:</span>
//           <Input
//             type="dropdown"
//             name="sortType"
//             errorCheck={false}
//             validCheck={false}
//             isRequired={false}
//             nullOption={false}
//             options={CATEGORY_PAGE_SORT_TYPES.map(({ label, sortBy }) => ({
//               label,
//               value: sortBy
//             }))}
//             customValue={{
//               setValue: (sortBy) => setCurrSort(sortBy as ContentsSortType),
//               value: currSort
//             }}
//             customStyle="outline-none border-none rounded-xl transition-all duration-300 cursor-pointer bg-charcoal-3/5 hover:bg-charcoal-3/10 px-3.5 py-2"
//           />
//         </div>
//       </div>

//       <div className="max-sm:px-3.5">
//         <BoxTheme isContent>
//           {hasNoImages &&
//             data.media &&
//             data.media?.quickLinks &&
//             data.media?.quickLinks.length > 0 &&
//             categoryList && (
//               <div className="pt-3.5 pb-2 max-sm:px-3 sm:pt-2 sm:pb-5">
//                 <Categories
//                   scrollable={true}
//                   asCategoryPageQuickLink
//                   columns={6}
//                   shape="square"
//                   categoryList={categoryList}
//                 />
//               </div>
//             )}

//           <FrontendProductTiles
//             inCategoryPage
//             currSort={currSort}
//             extraCurved={true}
//             sync
//             productList={contents.slice().sort((a, b) => {
//               if (currSort === "latest") {
//                 const dateA = a.updatedAt
//                   ? new Date(a.updatedAt).getTime()
//                   : -Infinity;
//                 const dateB = b.updatedAt
//                   ? new Date(b.updatedAt).getTime()
//                   : -Infinity;

//                 return dateB - dateA;
//               } else if (currSort === "popularity") {
//                 const ratingA =
//                   a.quality && a.quality.rating ? a.quality.rating.count : 0;
//                 const ratingB =
//                   b.quality && b.quality.rating ? b.quality.rating.count : 0;

//                 return ratingB - ratingA;
//               }

//               const priceA =
//                 getCityWiseContentPrices({ city: null, content: a }).price || 0;
//               const priceB =
//                 getCityWiseContentPrices({ city: null, content: b }).price || 0;

//               return currSort === "high-to-low"
//                 ? priceB - priceA
//                 : priceA - priceB;
//             })}
//             limit={displayContents}
//           />
//         </BoxTheme>
//       </div>

//       {canLoadMore ? (
//         <div
//           ref={loadMoreRef}
//           className={`flex items-center rounded-lg justify-center gap-2 w-full mt-8 py-2 text-lg text-center transition-all duration-300 text-charcoal-3/40 ${noMoreContentsToLoad ? "hidden" : ""}`}
//         >
//           <Loader2
//             strokeWidth={1.5}
//             width={19}
//             height={19}
//             className="animate-spin"
//           />
//           <span>Loading more...</span>
//         </div>
//       ) : (
//         <div className="w-full h-2" />
//       )}

//       {/* REVIEWS -------------------------------------------- */}
//       {reviews && reviews.length > 0 ? (
//         <div className="max-sm:px-3.5 pt-16 space-y-4">
//           <FrontendCategoryListTitle
//             title={"Customer Reviews"}
//             onlyTitle
//             totalRating={0}
//             totalReviews={0}
//           />
//           <BoxTheme className="!px-0">
//             <FrontendContentReviews
//               availableReviewImages={[]}
//               content={{
//                 _id: data._id as string,
//                 reviews:
//                   reviews.length > 0 ? reviews.map((rvw) => rvw.review) : [],
//                 areas:
//                   reviews.length > 0
//                     ? reviews.map((rvw) => rvw.area || "")
//                     : undefined,
//                 showReviews: CATEGORY_PAGE_REVIEW_LIMIT
//               }}
//             />
//           </BoxTheme>
//         </div>
//       ) : (
//         <></>
//       )}

//       {/* FILTERS FOR MOBILE ------------------------------------------ */}
//       {/* <div
//         ref={mobileFilterRef}
//         onClick={() => setOpenFilter((prev) => true)}
//         className=" bg-sienna brightness-75 contrast-150 text-ivory-1 py-2.5 px-3.5 rounded-lg aspect-square font-light flex items-center justify-center gap-2.5 sm:hidden sticky bottom-2 left-[500dvw] -translate-x-2 w-fit z-[600]"
//       >
//         <FilterIcon
//           strokeWidth={1.5}
//           width={17}
//           height={17}
//         />
//       </div> */}

//       {/* CUSTOM TEXT ------------------------------------------ */}
//       {data.info &&
//       data.info.bottomContent &&
//       data.info.bottomContent.length > 0 ? (
//         <HorizontalSpacing
//           className={`${BASE_HOME_BG_COLOR} z-[820] pt-10 `}
//           inCategoryPage
//         >
//           <BoxTheme>
//             <div className="px-1">
//               <CustomTypedContent content={bottomContent} />
//             </div>
//           </BoxTheme>
//         </HorizontalSpacing>
//       ) : (
//         <></>
//       )}

//       {/* FAQs ------------------------------------------ */}
//       {data.seo.faqs.length > 0 && (
//         <HorizontalSpacing
//           className={`${BASE_HOME_BG_COLOR} z-[810] pt-10 `}
//           inCategoryPage
//         >
//           <FrontendCategoryListTitle
//             title={"Frequently Asked Questions"}
//             onlyTitle
//             totalRating={0}
//             totalReviews={0}
//           />
//           <BoxTheme className="my-4">
//             <div className="px-2">
//               <FAQs
//                 faqData={data.seo.faqs.map(({ _id, question, answer }) => ({
//                   _id: _id as string,
//                   question,
//                   answer
//                 }))}
//               />
//             </div>
//           </BoxTheme>
//         </HorizontalSpacing>
//       )}

//       {/* ====[ DIALOG POPUP FILTERS ]================================================= */}
//       {/* <Dialog
//         open={openFilter}
//         onOpenChange={setOpenFilter}
//       >
//         <DialogContent className="p-0 sm:hidden">
//           <div className="relative w-device h-device bg-gradient-to-b from-sienna-3/30 via-20% via-ivory-1 to-ivory-1 flex flex-col justify-start overflow-y-scroll scrollbar-hide">
//             <HorizontalSpacing className="flex flex-col justify-start h-full">
//               <div className="text-xl font-medium pt-7 pb-3 text-sienna brightness-90">
//                 Apply Filters
//               </div>
//               <FrontendCategoryListFilter filters={dummyFilters} />
//             </HorizontalSpacing>

//             <HorizontalSpacing className="pb-3 sticky bottom-0">
//               <div
//                 className=" bg-sienna brightness-90 text-white rounded-md py-2.5 text-center"
//                 onClick={() => setOpenFilter((prev) => false)}
//               >
//                 Apply
//               </div>
//             </HorizontalSpacing>
//           </div>
//         </DialogContent>
//       </Dialog> */}

//       <CategorySortAndFilter
//         selectedSort={currSort}
//         onSelectSort={(sort) => {
//           setCurrSort((prev) => sort);
//           setGoToTop((prev) => true);
//         }}
//       />

//       <div
//         className={`${BASE_HOME_BG_COLOR} w-full sm:hidden h-20 -mt-14 z-[90]`}
//       />
//     </>
//   );
// }

export default function FrontendCategoryListPage() {
  return <div>FrontendCategoryListPage</div>;
}
