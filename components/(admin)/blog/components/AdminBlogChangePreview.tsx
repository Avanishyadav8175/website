import { BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { useEffect, useState } from "react";
import {
  BlogH1Heading,
  BlogShareButton
} from "@/components/(blog)/content/BlogPage/components/TopSection";
import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import BlogArticleContent from "@/components/(blog)/content/BlogPage/components/BlogArticleContent";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { getBlogArticleSections } from "@/common/helpers/generateStaticBlogData";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";
import { LocationProvider } from "@/hooks/useLocation/useLocation";

export default function AdminBlogChangePreview({
  data,
  title,
  currIndex,
  images,
  contents,
  expandPreview
}: {
  data: BlogArticleDocument["layouts"] | undefined;
  title: string;
  currIndex: 0 | 1;
  images: ImageDocument[];
  contents: ContentDocument[];
  expandPreview: boolean;
}) {
  const [previewRawString, setPreviewRawString] = useState<
    (string | ContentDocument[])[]
  >(data ? getBlogArticleSections(images, contents, data) : []);

  useEffect(() => {
    const sections: (string | ContentDocument[])[] = getBlogArticleSections(
      images,
      contents,
      data
    );
    setPreviewRawString((prev) => sections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section
      className={`flex-grow grid grid-cols-1 auto-rows-min px-4 py-3 overflow-auto scrollbar-hide max-h-[calc(90dvh)] ${currIndex === 1 ? "max-[1100px]:max-w-[calc(90dvw_-_360px)] max-w-[calc(1100px_-_360px)]" : expandPreview ? "max-[1100px]:max-w-[calc(90dvw_-_20dvw)] max-w-[calc(1100px_-_220px)]" : "max-[1100px]:max-w-[calc(90dvw_-_60dvw)] max-w-[calc(1100px_-_660px)]"}`}
    >
      {/* -------[ TOP SECTION ]--------------------------------- */}
      <section className="flex flex-col justify-start pb-6">
        {/* title ================================================= */}
        <div className="mt-8 sm:mt-4 pb-3.5 flex flex-col sm:flex-row items-center gap-y-2.5 justify-center sm:justify-between gap-x-4">
          <BlogH1Heading title={title} />
          <BlogShareButton link={`#`} />
        </div>
      </section>

      <span></span>

      {data && (
        <>
          <LocationProvider>
            <div className="flex flex-col justify-start gap-y-3.5  overflow-auto scrollbar-hide max-h-[calc(90dvh_-_90px)] pb-52">
              {/* -------[ ARTICLE SECTION ]--------------------------------- */}
              {previewRawString.map((subArticle, index) =>
                typeof subArticle === "string" ? (
                  <BlogArticleContent
                    innerHTML={subArticle}
                    key={index}
                  />
                ) : (
                  <BoxTheme key={index}>
                    <FrontendProductTiles
                      productList={subArticle}
                      inAdmin
                      type="scrollable"
                      sync
                    />
                  </BoxTheme>
                )
              )}

              {/* -------[ FAQS SECTION ]--------------------------------- */}
              {data.filter(({ type }) => type === "faq").length > 0 ? (
                <div className="mt-12 max-sm:mb-5">
                  <span className={"text-xl font-medium mb-3 "}>
                    Frequently Asked Questions
                  </span>
                  {data
                    .filter(({ type }) => type === "faq")
                    .map((faq, index) => {
                      const qna: QADocument[] = faq.layout.faq || [];
                      const faqs = qna.map(({ _id, question, answer }) => ({
                        _id: _id as string,
                        question,
                        answer
                      }));
                      return (
                        <FAQs
                          faqData={faqs}
                          key={index}
                        />
                      );
                    })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </LocationProvider>
        </>
      )}
    </section>
  );
}
