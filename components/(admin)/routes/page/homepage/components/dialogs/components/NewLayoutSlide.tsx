
import {
  Boxes,
  GalleryVertical,
  GripHorizontal,
  LayoutDashboard,
  Link,
  MessageCircleQuestion,
  Type,
  WholeWord
} from "lucide-react";
import { HomepageLayoutType } from "../../../HomepageManagement";
import { LayoutEditPageType } from "../NewOrEditLayoutDialog";
import { useState } from "react";
import Input from "@/lib/Forms/Input/Input";

export default function NewLayoutSlide({
  currSlide,
  selectedLayout,
  onChangeSelectedLayout,
  onSelectIndex,
  totalLayouts,
  currOrder
}: {
  currSlide: LayoutEditPageType;
  selectedLayout: HomepageLayoutType["tag"] | undefined;
  onChangeSelectedLayout: (
    layout: HomepageLayoutType["tag"] | undefined
  ) => void;
  onSelectIndex: (newIndex: number) => void;
  totalLayouts: number;
  currOrder: number;
}) {
  const [chosenOrder, setChosenOrder] = useState<"top" | "bottom" | "custom">(
    "custom"
  );

  const layoutTypes: {
    label: string;
    tag: HomepageLayoutType["tag"];
    svg: JSX.Element;
  }[] = [
    {
      label: "Title",
      svg: (
        <Type
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "title"
    },
    {
      label: "Custom Text",
      svg: (
        <WholeWord
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "text"
    },
    {
      label: "Product",
      svg: (
        <Boxes
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "content"
    },
    {
      label: "Category",
      svg: (
        <GripHorizontal
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "category"
    },
    {
      label: "Collage",
      svg: (
        <LayoutDashboard
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "collage"
    },
    {
      label: "Banner",
      svg: (
        <GalleryVertical
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "banner"
    },
    {
      label: "FAQs",
      svg: (
        <MessageCircleQuestion
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "faq"
    },
    {
      label: "Quick Links",
      svg: (
        <Link
          strokeWidth={1.5}
          width={32}
          height={32}
        />
      ),
      tag: "quick-link"
    }
  ];

  return (
    <section
      className={`relative grid grid-cols-[3fr_2fr] gap-x-5 gap-y-5 auto-rows-min px-7 pb-20 ${currSlide === "choose-layout" ? "translate-x-0" : "-translate-x-[100%]"} transition-all duration-500 bg-[#fcfcfc] h-full min-w-[80dvw] max-w-[1000px]`}
    >
      <div className="col-span-2 flex flex-col items-center justify-center pt-10 pb-2">
        <span className="text-3xl font-light">New Layout</span>
        <span className="text-sm text-charcoal-3/60 py-2">
          Start with selecting the layout type & its position in homepage
        </span>
      </div>

      <div className="grid grid-cols-3 auto-rows-min gap-5 relative overflow-y-scroll scrollbar-hide h-[calc(95dvh_-_140px)]">
        {layoutTypes.map(({ label, svg, tag }, index) => (
          <div
            key={index}
            onClick={
              selectedLayout === tag
                ? () => onChangeSelectedLayout(undefined)
                : () => onChangeSelectedLayout(tag)
            }
            className={`text-center flex flex-col justify-center items-center gap-2.5 aspect-[3/2] rounded-2xl shadow-sm border ${selectedLayout === tag ? "border-teal-400 bg-teal-100 hover:bg-teal-200/90 text-teal-600" : "border-charcoal-3/20 hover:bg-ivory-2/80 text-charcoal-3"}  transition-all duration-300 cursor-pointer`}
          >
            {svg}
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[30px_1fr] relative overflow-y-scroll scrollbar-hide h-[calc(95dvh_-_140px)]">
        <div className="flex items-stretch justify-center *:h-full *:w-px *:bg-charcoal-3/20">
          <div />
        </div>

        <div className="flex flex-col items-end justify-start pl-4 pr-2">
          <span className="text-2xl font-light">Position of layout</span>
          <span className="flex items-center justify-end gap-x-2.5 py-3 *:px-3.5 *:py-1 *:rounded-lg *:border *:border-charcoal-3/20 *:text-center *:text-sm *:text-charcoal-3 *:cursor-pointer *:transition-all *:duration-300">
            <span
              onClick={() => {
                onSelectIndex(0);
                setChosenOrder((prev) => "top");
              }}
              className={
                chosenOrder === "top"
                  ? "!border-teal-500 !text-teal-500 !bg-teal-100"
                  : ""
              }
            >
              Top
            </span>
            <span
              onClick={() => {
                onSelectIndex(totalLayouts + 1);
                setChosenOrder((prev) => "bottom");
              }}
              className={
                chosenOrder === "bottom"
                  ? "!border-teal-500 !text-teal-500 !bg-teal-100"
                  : ""
              }
            >
              Bottom
            </span>
            <span
              onClick={() => {
                onSelectIndex(totalLayouts + 1);
                setChosenOrder((prev) => "custom");
              }}
              className={
                chosenOrder === "custom"
                  ? "!border-teal-500 !text-teal-500 !bg-teal-100"
                  : ""
              }
            >
              Custom
            </span>
          </span>

          {chosenOrder === "custom" ? (
            <span className="flex flex-col justify-start items-end pt-2 text-charcoal-3 *:text-right">
              <span className="text-sm">Custom Order:</span>
              <Input
                type="number"
                errorCheck={false}
                validCheck={false}
                isRequired={false}
                name="order"
                customValue={{
                  value: String(currOrder || totalLayouts + 1),
                  setValue: (newOrder: string) => {
                    onSelectIndex(parseInt(newOrder));
                  }
                }}
                customStyle="w-full outline-none bg-transparent border-b border-charcoal-3/30 pb-2 pt-1 text-right transition-all duration-300 focus:border-charcoal-3/50"
              />
              <span className="text-sm text-blue-600 pt-5">
                How This Works:
              </span>
              <span className="text-sm pl-6">
                For example, if you enter 10, then all the layouts greater than
                10(inclusive) will shift down
              </span>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
