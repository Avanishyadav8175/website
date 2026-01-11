// components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import Input from "@/lib/Forms/Input/Input";

// icons
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

// types
import { type FilterOptionWithKeywordOptions } from "@/common/types/redux/filterOption";
import { type SelectOption } from "@/common/types/inputs";

export default function TableLayoutQuerySidebar({
  showSidebar,
  search,
  limit,
  filter,
  sort
}: {
  showSidebar: boolean;
  search?: {
    keyword: string;
    onChangeKeyword: (newKeyword: string) => void;
  };
  limit?: {
    limit: number;
    onChangeLimit: (newLimit: number) => void;
  };
  filter?: {
    options: FilterOptionWithKeywordOptions[];
    filterBy: string;
    keyword: string;
    onChangeFilterBy: (newFilterBy: string) => void;
    onChangeKeyword: (newKeyword: string) => void;
  };
  sort?: {
    options: SelectOption[];
    sortBy: string;
    orderBy: "asc" | "desc";
    onChangeSortBy: (newSortBy: string) => void;
    onChangeOrderBy: (newOrderBy: "asc" | "desc") => void;
  };
}) {
  return (
    <section
      className={`max-sm:hidden grid grid-cols-[24px_24px_1fr] overflow-auto scrollbar-hide ${showSidebar ? "w-[300px]" : "w-0"} transition-all duration-300`}
    >
      <div />
      <div className="border-l-[1.5px] border-neutral-300" />
      <div className="flex flex-col justify-start">
        <h4 className="font-light text-2xl text-center pt-8 pb-4">Query</h4>
        {search && (
          <Input
            type="text"
            name="searchBar"
            errorCheck={false}
            validCheck={false}
            isRequired={false}
            placeholder="Search Keyword..."
            className="mb-3"
            customValue={{
              value: search.keyword,
              setValue: search.onChangeKeyword
            }}
          />
        )}
        {limit && (
          <section className="flex flex-col gap-2 w-full">
            <span className="font-light text-lg">
              Showing {limit.limit} entries per page
            </span>
            <input
              type="range"
              name="limit"
              value={limit.limit}
              onChange={(e) => {
                limit.onChangeLimit(Number(e.target.value));
              }}
              min={10}
              max={100}
              step={10}
            />
          </section>
        )}
        <Accordion type="multiple">
          {filter && (
            <AccordionItem value="filter">
              <AccordionTrigger className="font-light text-lg py-5 hover:no-underline">
                Filter By
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col justify-start gap-2.5">
                  <Input
                    type="dropdown"
                    name="filterBy"
                    isRequired={false}
                    errorCheck={false}
                    validCheck={false}
                    nullOption={true}
                    options={filter.options.map(({ label, value }) => ({
                      label,
                      value
                    }))}
                    customValue={{
                      value: filter.filterBy,
                      setValue: filter.onChangeFilterBy
                    }}
                    className="py-2.5 focus:!outline-none"
                  />
                  {filter.filterBy && (
                    <Input
                      type="dropdown"
                      name="filterByKeyword"
                      isRequired={false}
                      validCheck={false}
                      errorCheck={false}
                      nullOption={true}
                      options={
                        filter.options.find(
                          ({ value }) => value === filter.filterBy
                        )?.options || []
                      }
                      customValue={{
                        value: filter.keyword,
                        setValue: filter.onChangeKeyword
                      }}
                      className="py-2.5 focus:!outline-none"
                    />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          {sort && (
            <>
              <AccordionItem value="sort">
                <AccordionTrigger className="font-light text-lg py-5 hover:no-underline">
                  Sort By
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-start gap-2.5">
                    {sort.options.map(({ label, value }, index) => (
                      <div
                        key={index}
                        onClick={() => sort.onChangeSortBy(value)}
                        className={`px-4 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${value === sort.sortBy ? "bg-teal-400/35 border-teal-700 !text-teal-700" : "cursor-pointer hover:bg-neutral-200"}`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="order">
                <AccordionTrigger className="font-light text-lg py-5 hover:no-underline">
                  Order By
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col justify-start gap-2.5">
                    <div
                      onClick={() => sort.onChangeOrderBy("asc")}
                      className={`px-3 flex items-center justify-start gap-1.5 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${sort.orderBy === "asc" ? "bg-teal-400/35 border-teal-700 !text-teal-700" : "cursor-pointer hover:bg-neutral-200"}`}
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
                      onClick={() => sort.onChangeOrderBy("desc")}
                      className={`px-3 flex items-center justify-start gap-1.5 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${sort.orderBy === "desc" ? "bg-teal-400/35 border-teal-700 !text-teal-700" : "cursor-pointer hover:bg-neutral-200"}`}
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
            </>
          )}
        </Accordion>
      </div>
    </section>
  );
}
