// utils
import { memo } from "react";

// components
import BoxTheme from "./theme/BoxTheme";
import ContentArray from "./array/ContentArray";
import ContentHorizontalSpacing from "./spacing/ContentHorizontalSpacing";
import ContentVerticalSpacing from "./spacing/ContentVerticalSpacing";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

function ContentsSection({
  title,
  titleId,
  applyBoxTheme,
  styles,
  titleStyles,
  boxStyles,
  contents,
  isScrollable
}: {
  title: string;
  titleId?: string;
  applyBoxTheme?: boolean;
  styles?: string;
  titleStyles?: string;
  boxStyles?: string;
  contents: ContentDocument[];
  isScrollable?: boolean;
}) {
  return (
    <ContentVerticalSpacing>
      <ContentHorizontalSpacing>
        <section
          className={`relative flex flex-col justify-start gap-3 sm:gap-6 ${styles || ""}`}
        >
          <div
            id={titleId}
            className={`text-xl sm:text-2xl sm:pl-3.5 font-medium text-charcoal-3 ${titleStyles || ""}`}
          >
            {title}
          </div>
          {/* {applyBoxTheme ? (
            // <BoxTheme>
              <ContentArray
                isScrollable={isScrollable}
                contents={contents}
              />
            // </BoxTheme>
          ) : ( */}
            <ContentArray
              isScrollable={isScrollable}
              contents={contents}
            />
          {/* )} */}
        </section>
      </ContentHorizontalSpacing>
    </ContentVerticalSpacing>
  );
}

export default memo(ContentsSection);
