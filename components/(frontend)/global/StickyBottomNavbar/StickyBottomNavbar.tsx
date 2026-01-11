"use client";
import { CATEGORY_PAGE_SORT_TYPES } from "@/components/pages/(frontend)/CategoryList/static/data";
import { ContentsSortType } from "@/components/pages/(frontend)/CategoryList/static/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Filter, SortDesc } from "lucide-react";

export default function CategorySortAndFilter({
  selectedSort,
  onSelectSort
}: {
  selectedSort: ContentsSortType;
  onSelectSort: (sort: ContentsSortType) => void;
}) {
  return <></>;
  
  return (
    <section className="z-[50] sticky bottom-0 sm:hidden w-device bg-ivory-1 border-t border-ash-1/20 grid grid-cols-2 items-center justify-center *:py-2 *:flex *:items-center *:justify-center *:gap-3 text-charcoal-3/70 *:cursor-pointer *:transition-all *:duration-300">
      {/* FILTER ==================================================== */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="hover:bg-charcoal-3/5">
            <Filter
              strokeWidth={1.5}
              width={18}
              height={18}
            />
            <div className="flex flex-col justify-start items-start gap-0 *:leading-tight">
              <span>Filter</span>
              <span className="text-xs font-medium capitalize">
                {"Coming Soon"}
              </span>
            </div>
          </button>
        </DrawerTrigger>

        <DrawerContent className="z-[996] p-3.5 py-16 rounded-t-2xl border-none outline-none flex flex-col items-center justify-end text-center text-charcoal-3/50 text-sm gap-y-0.5 *:px-3">
          <Filter
            strokeWidth={1.5}
            width={60}
            height={60}
          />
          <span>Coming Soon</span>
        </DrawerContent>
      </Drawer>

      {/* SORT =============================================================== */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="hover:bg-charcoal-3/5 relative">
            <SortDesc
              strokeWidth={1.5}
              width={18}
              height={18}
            />
            <div className="flex flex-col justify-start items-start gap-0 *:leading-tight">
              <span>Sort</span>
              <span className="text-xs font-medium capitalize">
                {selectedSort.split("-").join(" ")}
              </span>
            </div>

            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[22px] bg-charcoal-3/20" />
          </button>
        </DrawerTrigger>

        <DrawerContent className="z-[996] p-3.5 py-5 rounded-t-2xl border-none outline-none flex flex-col items-stretch justify-end gap-y-0.5 *:py-2.5 *:px-3">
          {CATEGORY_PAGE_SORT_TYPES.map(({ label, sortBy }, index) => (
            <DrawerClose
              key={index}
              asChild
            >
              <div
                className={`${selectedSort === sortBy ? "text-sienna bg-sienna-3/20" : "hover:bg-charcoal-3/5"} rounded-xl transition-all duration-300 cursor-pointer`}
                onClick={() => onSelectSort(sortBy)}
              >
                {label}
              </div>
            </DrawerClose>
          ))}
        </DrawerContent>
      </Drawer>
    </section>
  );
}
