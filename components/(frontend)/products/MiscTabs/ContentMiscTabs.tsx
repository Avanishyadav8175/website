
"use client";
import { useEffect, useState } from "react";
import design from "./scss/design.module.scss";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Info, InfoIcon } from "lucide-react";
import { decodeHtmlEntities } from "@/common/helpers/generateStaticBlogData";
import { ContentDetailDocument } from "@/common/types/documentation/nestedDocuments/contentDetail";
import { CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";
import { DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";
import { FAQGroupDocument } from "@/common/types/documentation/presets/faqGroup";
import { CareInfoDocument } from "@/common/types/documentation/presets/careInfo";
import FAQs from "../../global/_Templates/FAQs/FAQs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";

export default function ContentMiscTabs({
  tabData
}: {
  tabData: ContentDetailDocument | undefined;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [cancellationDetails, setCancellationDetails] = useState<string>("");

  useEffect(() => {
    setCancellationDetails((prev) =>
      decodeHtmlEntities(
        (tabData?.cancellationPolicy as CancellationPolicyDocument).content ||
          ""
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = ["Package Includes", "FAQs", "Delivery Details", "Care Info"];

  return (
    <section className="flex flex-col items-stretch justify-start gap-0 sm:pl-5 sm:pr-2.5">
      {tabData ? (
        <>
          {/* TABS ================================================================ */}
          <div className="flex items-center justify-start gap-2 overflow-x-scroll scrollbar-hide border-b border-charcoal-3/10">
            {tabs.map((tabName, index) => (
              <h2
                key={index}
                className={`border-b-[3px] px-4 py-2 cursor-pointer ${index === activeIndex ? "border-sienna text-sienna font-medium" : "border-transparent"} transition-all duration-200 whitespace-nowrap`}
                onClick={() => setActiveIndex((prev) => index)}
              >
                {tabName}
              </h2>
            ))}
          </div>

          {/* INCLUDES ============================================================== */}
          {activeIndex === 0 && (
            <BulletsData
              data={tabData.includes
                .map((str) => str.split("\n"))
                .reduce((arr, val) => (arr = [...arr, ...val]), [])}
              hasExclude={tabData.excludes}
            />
          )}

          {/* FAQs ============================================================== */}
          {activeIndex === 1 && (
            <div className="sm:pl-2 sm:pt-1">
              <FAQs
                inProductPage
                faqData={(tabData.faqGroup as FAQGroupDocument).faqs.map(
                  ({ _id, question, answer }) => ({
                    _id: _id as string,
                    question,
                    answer
                  })
                )}
              />
            </div>
          )}

          {/* DELIVERY DETAILS ============================================================== */}
          {activeIndex === 2 && (
            <BulletsData
              data={(tabData.deliveryDetail as DeliveryDetailDocument).content}
              hasCancellationPolicy={{
                content: cancellationDetails,
                label: (
                  tabData.cancellationPolicy as CancellationPolicyDocument
                ).label
              }}
            />
          )}

          {/* CARE INFO ============================================================== */}
          {activeIndex === 3 && (
            <BulletsData
              data={(tabData.careInfo as CareInfoDocument).content}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

const BulletsData = ({
  data,
  hasExclude,
  hasCancellationPolicy
}: {
  data: string[];
  hasExclude?: string[];
  hasCancellationPolicy?: { label: string; content: string };
}) => {
  const [showCancellationPolicy, setShowCancellationPolicy] =
    useState<boolean>(false);

  return (
    <div
      className={
        " py-2.5 flex flex-col justify-start gap-3 text-sm text-black/65 sm:pl-0 sm:pt-3.5"
      }
    >
      <div className="grid grid-cols-[20px_1fr] gap-1 justify-start items-start">
        {data.map((str) => (
          <>
            <span className="text-center">•</span>
            <h3>{str}</h3>
          </>
        ))}
      </div>
      {hasExclude && hasExclude.length > 0 ? (
        <>
          <span className="pl-[24px] underline">Does not include:</span>
          <div className="grid grid-cols-[20px_1fr] gap-1">
            {hasExclude.map((str) => (
              <>
                <span className="text-center">•</span>
                <span>{str}</span>
              </>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      {hasCancellationPolicy && hasCancellationPolicy.content && (
        <>
          <Dialog>
            <DialogTrigger
              asChild
              className="max-sm:hidden"
            >
              <div className="bg-charcoal-3/10 px-4 py-2 rounded-xl w-fit self-end sm:mt-3 transition-all duration-300 hover:bg-neutral-300/80 cursor-pointer text-charcoal-3 flex items-center justify-end gap-2">
                <InfoIcon
                  strokeWidth={1.5}
                  width={18}
                  height={18}
                />
                <h4>Show Cancellation Policy</h4>
              </div>
            </DialogTrigger>
            <DialogContent className="z-[996] gap-0 sm:pt-7 rounded-2xl max-h-[90dvh] overflow-auto scrollbar-hide">
              <div className="flex items-center justify-start gap-3">
                <Info
                  strokeWidth={1.5}
                  width={22}
                  height={22}
                />
                <div className="text-xl">Cancellation Policy</div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: hasCancellationPolicy.content
                }}
                className={design.parent}
              />
              <DialogClose asChild>
                <div className="transition-all duration-300 w-fit rounded-lg py-2 px-6 bg-charcoal-3/15 text-charcoal-3 hover:bg-charcoal-3/30 cursor-pointer">
                  Close
                </div>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger
              asChild
              className="sm:hidden"
            >
              <div className="bg-charcoal-3/10 px-4 py-2 rounded-xl w-fit self-end sm:mt-3 transition-all duration-300 hover:bg-neutral-300/80 cursor-pointer text-charcoal-3 flex items-center justify-end gap-2">
                <InfoIcon
                  strokeWidth={1.5}
                  width={18}
                  height={18}
                />
                <span>Show Cancellation Policy</span>
              </div>
            </DrawerTrigger>
            <DrawerContent className="z-[996] px-3.5 pt-8 pb-3 outline-none border-none  gap-0 sm:pt-7 rounded-t-3xl h-[80dvh] overflow-auto scrollbar-hide space-y-4">
              <div className="flex items-center justify-start gap-3">
                <Info
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
                <div className="text-xl">Cancellation Policy</div>
              </div>
              <div className="overflow-auto scrollbar-hide h-[63dvh]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: hasCancellationPolicy.content
                  }}
                  className={design.parent}
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <DrawerClose asChild>
                  <div
                    onClick={() => setShowCancellationPolicy((prev) => false)}
                    className="transition-all duration-300 w-fit rounded-lg py-2 px-6 bg-charcoal-3/15 text-charcoal-3 hover:bg-charcoal-3/30 cursor-pointer"
                  >
                    Close
                  </div>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </div>
  );
};
