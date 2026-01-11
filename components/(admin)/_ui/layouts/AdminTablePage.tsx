/* eslint-disable react-hooks/exhaustive-deps */

import TableContent, {
  type TableContent as TableContentType
} from "@/components/(_common)/TableLayout/TableContent";
import { AdminPanelHeading } from "../AdminTypography";
import {
  ArrowDownAZ,
  ArrowDownZA,
  Plus,
  Reply,
  RotateCcw,
  SlidersHorizontal,
  VenetianMask
} from "lucide-react";
import AdminThreeDots, { ThreeDotsType } from "../ThreeDots";
import TableLayoutPagination from "../../../../layouts/utils/table/components/TableLayoutPagination";
import { SetStateType } from "@/common/types/reactTypes";
import Input from "@/lib/Forms/Input/Input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { SortType } from "@/common/types/types";
import { FILTER_SIDEBAR_MAX_WIDTH } from "@/common/constants/adminPanel";
import {
  AllFiltersType,
  CurrFilterType
} from "@/common/types/layouts/admin/adminPanelLayout";
import { useEffect, useState } from "react";

type AdminSidebarOptionsType = {
  currOrderBy: SortType;
  setOrderBy: (newOrder: SortType) => void;

  availableSortOptions: { label: string; value: string }[];
  currSort: string;
  setSort: (sortValue: string) => void;

  currFilter: CurrFilterType | undefined;
  allFilters: AllFiltersType;
  setFilter: SetStateType<CurrFilterType | undefined>;

  searchVal: string;
  setSearchVal: (newVal: string) => void;
};

export default function AdminTablePage(
  props: {
    title: string;
    tableData: TableContentType;
    currLimit: number;
    currOffset: number;
    totalItems: number;
    filterSidebarId: string;
    showSidebar: boolean;
    setShowSidebar: SetStateType<boolean>;
    onClickPaginate: (newOffset: number) => void;
    reset: () => void;
    resetYellow: boolean;
  } & (
    | { hasAddData: false }
    | { hasAddData: true; onClickAddBtn: () => void }
  ) &
    ({ hasSearch: false } | { hasSearch: true; onClickSearchBtn: () => void }) &
    ThreeDotsType &
    AdminSidebarOptionsType
) {
  const { title, tableData, hasAddData, hasSearch } = props;
  const { hasLimit, hasFilter, hasSort, hasTrash } = props;
  const { currLimit, currOffset, totalItems, onClickPaginate } = props;
  const { filterSidebarId, showSidebar, setShowSidebar } = props;
  const { currOrderBy, setOrderBy, currFilter, allFilters, setFilter } = props;
  const { availableSortOptions, currSort, setSort, reset, resetYellow } = props;

  const maxOptionsWidth = `max-w-[${FILTER_SIDEBAR_MAX_WIDTH}px]`;

  const [selectedFilter, setSelectedFilter] = useState<string>(
    currFilter ? currFilter.value : ""
  );
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>(
    currFilter ? currFilter.keyword.value : ""
  );

  const majorFilter = allFilters.find(({ value }) => value === selectedFilter);
  const subOptions = majorFilter !== undefined ? majorFilter.options : [];

  useEffect(() => {
    setFilter((prev) => {
      const filter = allFilters.find(({ value }) => value === selectedFilter);

      if (!filter) return prev;
      return {
        label: filter.label,
        value: filter.value,
        keyword: { label: "", value: "" }
      };
    });
  }, [selectedFilter]);

  useEffect(() => {
    setFilter((prev) => {
      const filter = allFilters.find(({ value }) => value === selectedFilter);

      if (!filter) return prev;

      const subfilter = filter.options.find(
        ({ value }) => value === selectedSubFilter
      );

      if (!subfilter) return prev;

      return {
        label: prev?.label || "",
        value: prev?.value || "",
        keyword: subfilter
      };
    });
  }, [selectedSubFilter]);

  return (
    <div className="relative grid grid-cols-[1fr_auto]">
      {/* PRIMARY DATA ____________________________________________ */}
      <section>
        <div className="flex items-center justify-between pt-10 sm:pt-6">
          <AdminPanelHeading
            title={hasTrash && props.isTrashOpen ? `TRASH: ${title}` : title}
          />
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 *:cursor-pointer *:aspect-square *:p-2.5 *:rounded-full *:transition-all *:duration-300">
            {hasAddData && (!hasTrash || (hasTrash && !props.isTrashOpen)) && (
              <span
                onClick={props.onClickAddBtn}
                className="hover:bg-emerald-100 hover:text-emerald-700"
              >
                <Plus
                  strokeWidth={1.5}
                  width={22}
                  height={22}
                />
              </span>
            )}

            {/* {hasSearch && (
              <span
                onClick={props.onClickSearchBtn}
                className="hover:bg-neutral-200"
              >
                <Search
                  strokeWidth={1.5}
                  width={22}
                  height={22}
                />
              </span>
            )} */}

            <span
              onClick={() => setShowSidebar((prev) => !prev)}
              className="hover:bg-neutral-200"
            >
              <SlidersHorizontal
                strokeWidth={1.5}
                width={22}
                height={22}
                className="scale-90"
              />
            </span>

            <span
              onClick={reset}
              className={resetYellow ? "bg-amber-100" : "hover:bg-neutral-200"}
            >
              <RotateCcw
                strokeWidth={1.5}
                width={22}
                height={22}
                className={`scale-90 ${resetYellow ? "text-amber-700" : ""}`}
              />
            </span>

            {hasTrash && (
              <span
                onClick={props.onSelectTrashBtn}
                className={
                  props.isTrashOpen
                    ? "hover:text-teal-700 hover:bg-teal-100"
                    : "hover:text-rose-700 hover:bg-rose-100"
                }
              >
                {props.isTrashOpen ? (
                  <Reply
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                  />
                ) : (
                  <VenetianMask
                    strokeWidth={1.5}
                    width={20}
                    height={20}
                  />
                )}
              </span>
            )}

            <AdminThreeDots
              hasLimit={hasLimit}
              hasFilter={hasFilter}
              hasSort={hasSort}
              hasTrash={hasTrash}
              currFiltersApplied={hasFilter ? props.currFiltersApplied : []}
              currLimitApplied={hasLimit ? props.currLimitApplied : 0}
              isTrashOpen={(hasTrash && props.isTrashOpen) || false}
              currSortsApplied={hasSort ? props.currSortsApplied : []}
              setCurrLimit={hasLimit ? props.setCurrLimit : () => {}}
              onSelectTrashBtn={hasTrash ? props.onSelectTrashBtn : () => {}}
              onSelectSortBtn={hasSort ? props.onSelectSortBtn : () => {}}
              onSelectFilterBtn={hasFilter ? props.onSelectFilterBtn : () => {}}
            />
          </div>
        </div>
        <div className="pt-2 min-h-[calc(100dvh_-_82px)]">
          <TableContent
            content={tableData}
            mode={hasTrash && props.isTrashOpen ? "bale-moon" : "backend"}
          />
        </div>

        {/* pagination ------------------------- */}
        {hasLimit && (
          <TableLayoutPagination
            count={totalItems}
            offset={currOffset}
            limit={currLimit}
            onChangeOffset={onClickPaginate}
          />
        )}
      </section>

      {/* LOCKABLE FILTER SIDEBAR ____________________________________________ */}
      <section
        id={filterSidebarId}
        className={`max-sm:hidden grid grid-cols-[24px_24px_1fr] overflow-auto scrollbar-hide ${maxOptionsWidth}`}
      >
        <div />
        <div className="border-l-[1.5px] border-neutral-300" />
        <div className="flex flex-col justify-start">
          <span className="font-light text-2xl text-center pt-8 pb-4">
            Options
          </span>

          {/* Search bar --------------------------------------- */}
          <Input
            type="text"
            name="searchbar"
            errorCheck={false}
            validCheck={false}
            isRequired={false}
            placeholder="Search Keyword..."
            className="mb-3"
            customValue={{
              value: props.searchVal,
              setValue: (newString) => props.setSearchVal(newString)
            }}
          />

          {/* --------------------------------------- */}
          <Accordion type="multiple">
            {/* FILTER --------------------------------------- */}
            <AccordionItem value="filter">
              <AccordionTrigger className="font-light text-lg py-5 hover:no-underline">
                Filter By
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-start gap-2.5">
                  <Input
                    type="dropdown"
                    errorCheck={false}
                    validCheck={false}
                    isRequired={false}
                    name="filterBy"
                    nullOption={false}
                    options={allFilters.map(({ label, value }) => ({
                      label,
                      value
                    }))}
                    customValue={{
                      value: selectedFilter,
                      setValue: (newFilter) => {
                        setSelectedFilter((prev) => newFilter);
                      }
                    }}
                    className="py-2.5 focus:!outline-none"
                  />

                  <Input
                    type="dropdown"
                    errorCheck={false}
                    validCheck={false}
                    isRequired={false}
                    name="filterBy"
                    nullOption={false}
                    options={subOptions}
                    customValue={{
                      value: selectedSubFilter,
                      setValue: (newSubFilter) => {
                        setSelectedSubFilter((prev) => newSubFilter);
                      }
                    }}
                    className="py-2.5 focus:!outline-none"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* SORT --------------------------------------- */}
            <AccordionItem value="sort">
              <AccordionTrigger className="font-light text-lg py-5 hover:no-underline">
                Sort By
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-start gap-2.5">
                  {availableSortOptions.map(({ label, value }, index) => (
                    <div
                      onClick={
                        value === currSort ? () => {} : () => setSort(value)
                      }
                      className={`px-4 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${value === currSort ? "bg-teal-400/35 border-teal-700 !text-teal-700" : "cursor-pointer hover:bg-neutral-200"}`}
                      key={index}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ORDER --------------------------------------- */}
            <AccordionItem value="order">
              <AccordionTrigger className="font-light text-lg py-5 hover:no-underline">
                Order By
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-start gap-2.5">
                  <div
                    onClick={
                      currOrderBy === "asc" ? () => {} : () => setOrderBy("asc")
                    }
                    className={`px-3 flex items-center justify-start gap-1.5 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${currOrderBy === "asc" ? "bg-teal-400/35 border-teal-700 !text-teal-700" : "cursor-pointer hover:bg-neutral-200"}`}
                  >
                    <ArrowDownAZ
                      strokeWidth={1.5}
                      width={15}
                      height={15}
                      className="mx-1"
                    />
                    <span>Ascending</span>
                  </div>

                  <div
                    onClick={
                      currOrderBy === "desc"
                        ? () => {}
                        : () => setOrderBy("desc")
                    }
                    className={`px-3 flex items-center justify-start gap-1.5 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${currOrderBy === "desc" ? "bg-teal-400/35 border-teal-700 !text-teal-700" : "cursor-pointer hover:bg-neutral-200"}`}
                  >
                    <ArrowDownZA
                      strokeWidth={1.5}
                      width={15}
                      height={15}
                      className="mx-1"
                    />
                    <span>Descending</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
