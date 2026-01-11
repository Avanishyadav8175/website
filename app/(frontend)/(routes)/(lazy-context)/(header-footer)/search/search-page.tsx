"use client";
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";
import { GoogleAnalytics } from "@next/third-parties/google";
import { INRSymbol } from "@/common/constants/symbols";
import { fromSlug } from "@/common/utils/slugOperations";
import { getLocalStorage } from "@/common/utils/storage/local";
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";
import {
  createKeywordRegex,
  SearchContentsType
} from "@/components/(frontend)/components/header/page/components/content/components/search/SearchContentUI";
import ShineAnimation from "@/components/(frontend)/content/array/components/ShineAnimation";
import MaxWidthWrapper from "@/components/(frontend)/global/_MaxWidthWrapper/MaxWidthWrapper";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
import FrontendCategoryListTitle from "@/components/pages/(frontend)/CategoryList/components/ListTitle/ListTitle";
import { alwaysDecimal } from "@/components/pages/(frontend)/Content/components/Details/helpers/alwaysDecimal";
import { BASE_HOME_BG_COLOR } from "@/components/pages/(frontend)/Home/static/pallette";
import { OPTIMIZE_IMAGE } from "@/config/image";
import Input from "@/lib/Forms/Input/Input";
import { Loader2, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


type SearchPageSortTypes = "high-to-low" | "low-to-high" | "rating";
const sortOptions: { label: string; value: SearchPageSortTypes }[] = [
  { label: "Rating", value: "rating" },
  { label: "High to Low", value: "high-to-low" },
  { label: "Low to High", value: "low-to-high" }
];

export default function SearchPage() {
  const keys = useSearchParams();
  const searchKey = fromSlug(keys.get("key") || "");
  const regex = createKeywordRegex(searchKey);

  const loadMoreRef = useRef(null);

  const [offset, setOffset] = useState<number>(1);
  const [currSort, setCurrSort] = useState<SearchPageSortTypes>("rating");
  const [filteredResults, setFilteredResults] = useState<SearchContentsType[]>(
    []
  );

  useEffect(() => {
    const items = getLocalStorage({ key: "items" });
    const n = (items as SearchContentsType[]).length;

    let filtered: SearchContentsType[] = [];

    for (let i = 0; i < n; i += 1) {
      const obj = (items as SearchContentsType[])[i];
      if (regex.test(obj.name)) filtered.push(obj);
    }

    // sort before store
    filtered = filtered
      .slice()
      .sort((a: SearchContentsType, b: SearchContentsType) => {
        if (currSort === "rating") return (b.rating || 0) - (a.rating || 0);

        if (currSort === "low-to-high")
          return (a.price || a.basePrice || 0) - (b.price || b.basePrice || 0);

        return (b.price || b.basePrice || 0) - (a.price || a.basePrice || 0);
      });

    setFilteredResults((prev) => filtered);
    setOffset((prev) => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys, searchKey, currSort]);

  useEffect(() => {
    // ===[ OBSERVE QUICK LINKS ]=========================================
    const observeLoadMore = () => {
      const loadMoreDiv = loadMoreRef.current;
      if (!loadMoreDiv) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setOffset((prev) => prev + 1);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(loadMoreDiv);
    };

    observeLoadMore();
  }, []);

  return (
    <>
      <MaxWidthWrapper className="py-5 sm:py-6">
        {/* TITLE ------------------------------------------ */}
        <FrontendCategoryListTitle
          useH1
          title={`Results for "${searchKey}" (${filteredResults.length || 0} found)`}
          onlyTitle
          totalRating={0}
          totalReviews={0}
        />

        {/* PRODUCTS ------------------------------------------ */}
        {/* <div className="flex max-sm:flex-col items-start sm:items-center justify-start sm:justify-between py-5 max-sm:px-3.5">
          <div className="text-lg sm:text-xl font-medium max-1200:px-2 whitespace-nowrap text-charcoal-3/80">
            {filteredResults.length || 0} Results Found
          </div>

          <div className="max-sm:hidden relative flex items-center justify-end max-w-[200px] *:whitespace-nowrap overflow-x-scroll scrollbar-hide w-[100dvw] text-sm">
            <span className="mr-1 max-sm:hidden">Sort By:</span>
            <Input
              type="dropdown"
              name="sortType"
              errorCheck={false}
              validCheck={false}
              isRequired={false}
              nullOption={false}
              options={sortOptions.map(({ label, value }) => ({
                label,
                value
              }))}
              customValue={{
                setValue: (sortBy) => {
                  if (sortBy !== currSort)
                    setCurrSort((prev) => sortBy as SearchPageSortTypes);
                },
                value: currSort
              }}
              customStyle="outline-none border-none rounded-xl transition-all duration-300 cursor-pointer bg-charcoal-3/5 hover:bg-charcoal-3/10 px-3.5 py-2"
            />
          </div>
        </div> */}

        <div className="max-sm:px-3.5 mt-6">
          <BoxTheme isContent>
            {/* <FrontendProductTilesUI
            inSearch
            inCategoryPage
            currSort={"popularity"}
            extraCurved={true}
            sync
            productList={
              filteredResults
            }
            selectedCity={null}
          /> */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredResults
                .slice(0, offset * 24)
                .map(
                  ({ name, slug, price, basePrice, image, rating, edible }, index) => (
                    <Link
                      href={slug}
                      key={index}
                      className={`group grid *:row-start-1 *:col-start-1 min-w-[40dvw] sm:min-w-[15dvw] rounded-none h-fit min-h-fit`}
                    >
                      <div
                        className={`relative shadow-md z-20 transition-all duration-300 rounded-none sm:rounded-xl bg-ivory-1 ${index > 1 ? "max-sm:border-t-[0.5px]" : ""}  max-sm:pt-2.5 max-sm:pb-1 ${index % 2 === 0 ? "max-sm:pl-2.5 max-sm:pr-[6px]" : "max-sm:pl-[6px] max-sm:pr-2.5"}`}
                      >
                        <div
                          className={`relative aspect-square max-sm:p-1 rounded-none rounded-b-none sm:rounded-b-none sm:rounded-xl overflow-hidden `}
                        >
                          <Image
                            src={image}
                            alt={""}
                            height={500}
                            width={500}
                            quality={25}
                            decoding="async"
                            unoptimized={!OPTIMIZE_IMAGE}
                            className={
                              "max-sm:rounded-md w-full h-full object-cover object-center transition-all duration-500"
                            }
                          />
                          {/* <span className="absolute bottom-1 left-1 sm:left-1">
                            {edible ? (
                              edible[1] === "veg" ? (
                                <VegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                              ) : edible[1] !== "unspecified" ? (
                                <NonVegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                              ) : (
                                <></>
                              )
                            ) : (
                              <></>
                            )}
                          </span> */}

                          <ShineAnimation />
                        </div>

                        <div
                          className={`relative pt-2 flex flex-col gap-y-0.5 rounded-sm sm:rounded-xl rounded-t-none sm:rounded-t-none overflow-hidden bg-ivory-1 mt-0 sm:border-[1.5px] sm:border-ash/40 border-t-0`}
                        >
                          <div
                            className={`grid grid-cols-1 items-center px-1 max-sm:pt-1 sm:px-3 z-30 text-[15px] sm:text-base text-charcoal-3/80 leading-tight relative `}
                          >
                            <div
                              className={`line-clamp-1 pt-0.5 max-sm:pb-0.5 leading-tight`}
                            >
                              {name}
                            </div>
                            <div
                              className={`px-1 relative pt-1.5 pb-3 flex items-center justify-start gap-2 w-full z-20`}
                            >
                              <div className="text-[14px] sm:text-[18px] text-charcoal-3 group-hover:text-sienna-1 font-semibold transition-all duration-300">
                                {INRSymbol}{price || basePrice || 0}
                              </div>

                              <div className="flex items-center justify-start gap-1 text-xs font-medium sm:text-sm text-charcoal-3/80">
                                <StarIcon
                                  width={16}
                                  height={16}
                                  className="fill-amber-600 stroke-transparent brightness-105 max-sm:scale-90"
                                />
                                {alwaysDecimal(rating || 5)}{" "}rating
                              </div>
                            </div>

                            {/* <span className="justify-self-end">
                          {showVeganType ? (
                            isVegan === "veg" ? (
                              <VegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                            ) : isVegan === "non-veg" ? (
                              <NonVegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )}
                        </span> */}
                          </div>
                        </div>
                      </div>

                      {/* background effect ---------------------------------------------------------------- */}
                      <div
                        className={
                          "max-sm:hidden z-30 relative bg-transparent rounded-md sm:rounded-xl border border-transparent group-hover:border-charcoal-3/10 transition-all duration-300"
                        }
                      />
                    </Link>
                  )
                )}
            </div>
          </BoxTheme>
        </div>

        <div
          ref={loadMoreRef}
          className={`flex text-transparent items-center rounded-lg justify-center gap-2 w-full mt-8 py-2 text-lg text-center transition-all duration-300`}
        >
          <Loader2
            strokeWidth={1.5}
            width={19}
            height={19}
            className="animate-spin"
          />
          <span>Loading more...</span>
        </div>

        <div
          className={`${BASE_HOME_BG_COLOR} w-full sm:hidden h-20 -mt-14 z-[90]`}
        />
      </MaxWidthWrapper>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
