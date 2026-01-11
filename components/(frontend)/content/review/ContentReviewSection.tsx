// utils
import { memo } from "react";

// components
import BoxTheme from "../theme/BoxTheme";
import ContentHorizontalSpacing from "../spacing/ContentHorizontalSpacing";
import ContentReviewSectionUI from "./components/ContentReviewSectionUI";
import ContentVerticalSpacing from "../spacing/ContentVerticalSpacing";

// types
import { type ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

function ContentReviewSection({
  contentId,
  title,
  review,
  images,
  applyBoxTheme,
  styles,
  titleStyles
}: {
  contentId: string;
  title: string;
  review: ContentReviewDocument;
  images: ImageDocument[];
  applyBoxTheme?: boolean;
  styles?: string;
  titleStyles?: string;
}) {
  return (
    <ContentVerticalSpacing>
      <ContentHorizontalSpacing>
        <section
          className={`relative flex flex-col justify-start gap-3 sm:pt-7 sm:gap-6 ${styles || ""}`}
        >
          <div className="flex items-center justify-between">

            <div
              className={`text-xl sm:text-2xl sm:pl-3.5 font-medium text-charcoal-3 ${titleStyles || ""}`}
            >
              {title}
            </div>

            <Dialog>
              <DialogTrigger>
                <div className="flex items-center justify-center bg-charcoal-3 text-white font-medium rounded-lg p-1.5 px-3 cursor-pointer gap-1.5">
                  <Plus width={15} height={15} />
                  <span>Add a review</span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-sm:w-11/12 rounded-2xl w-96">
                <section className="space-y-3">
                  <span className="text-sienna text-xl font-medium">Add Your Review</span>
                  <input
                    type={"text"}
                    autoComplete="off"
                    name={"contentPageSelectPincode"}
                    placeholder={"Your Name "}
                    className={`w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none bg-ivory-2 border border-transparent transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:brightness-95 focus:outline-1 focus:outline-ash focus:outline-offset-2`}
                  />
                  <input
                    type={"text"}
                    autoComplete="off"
                    name={"contentPageSelectPincode"}
                    placeholder={"Your City"}
                    className={`w-full px-3 sm:px-3.5 py-2.5 rounded-xl outline-none bg-ivory-2 border border-transparent transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:brightness-95 focus:outline-1 focus:outline-ash focus:outline-offset-2`}
                  />
                  <textarea
                    autoComplete="off"
                    name={"contentPageSelectPincode"}
                    placeholder={"Your Review of this Product"}
                    className={`w-full px-3 sm:px-3.5 resize-none py-2.5 h-28 rounded-xl outline-none bg-ivory-2 border border-transparent transition-all duration-300 placeholder:text-charcoal-3/45 hover:brightness-95 focus:brightness-95 focus:outline-1 focus:outline-ash focus:outline-offset-2`}
                  />

                  <DialogClose asChild>
                    <div className="cursor-pointer bg-sienna rounded-lg text-center p-2.5 text-white">Submit and Close</div>
                  </DialogClose>
                </section>
              </DialogContent>
            </Dialog>
          </div>
          {/* <BoxTheme className="!pt-3 !pb-1"> */}
            <ContentReviewSectionUI
              contentId={contentId}
              review={review}
              images={images}
            />
          {/* </BoxTheme> */}
        </section>
      </ContentHorizontalSpacing>
    </ContentVerticalSpacing>
  );
}

export default memo(ContentReviewSection);
