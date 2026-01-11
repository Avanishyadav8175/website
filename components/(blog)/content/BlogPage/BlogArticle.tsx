"use client";

// config

// icons
import { PaintBucket, Tag, UserRound } from "lucide-react";

// components
import { DOMAIN } from "@/common/constants/domain";
import {
  getBlogArticleSections
} from "@/common/helpers/generateStaticBlogData";
import { BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { BlogTagDocument } from "@/common/types/documentation/blog/blogTag";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { SchemaDataType } from "@/common/types/seoTypes";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import BoxTheme from "@/components/(frontend)/global/_Templates/BoxTheme/BoxTheme";
import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import FrontendProductTiles from "@/components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles";
import { LocationProvider } from "@/hooks/useLocation/useLocation";
import moment from "moment";
import { useEffect, useState } from "react";
import BlogArticleContent from "./components/BlogArticleContent";
import {
  BlogH1Heading,
  BlogShareButton,
  BlogTags
} from "./components/TopSection";

export default function BlogArticle({
  blogArticle: {
    heading,
    slug,
    author,
    categories,
    tags,
    meta,
    layouts,
    createdAt
  },
  inFrontend
}: {
  blogArticle: BlogArticleDocument;
  inFrontend?: boolean;
}) {
  const [previewRawString, setPreviewRawString] = useState<
    (string | ContentDocument[])[]
  >(layouts ? getBlogArticleSections([], [], layouts) : []);

  const faqData = layouts
    .find(({ type }) => type === "faq")
    ?.layout.faq?.map(({ _id, question, answer }) => ({
      question,
      answer,
      _id: _id as string
    }));

  useEffect(() => {
    const sections: (string | ContentDocument[])[] = getBlogArticleSections(
      [],
      [],
      layouts,
      true
    );
    setPreviewRawString((prev) => sections);
  }, [layouts]);

  const schemaData: SchemaDataType = {
    BlogArticle: {
      webpage: {
        name: heading,
        alternateName: heading,
        image:
          (
            layouts.find(({ type }) => type === "image")?.layout?.image
              ?.images as ImageDocument[]
          ).at(0)?.url || "",
        url: `${DOMAIN}/blog/${slug}`
      },
      blogPosting: {
        url: `${DOMAIN}${slug.startsWith("/") ? slug : "/" + slug}`,
        authorName: (author as BlogAuthorDocument)?.name || "Anonymous",
        description: meta.description || "",
        headline: heading,
        publishedOn: moment(createdAt).format("DD MMMM YYYY"),
        body:
          layouts
            .find(({ type }) => type === "text")
            ?.layout.text?.substring(0, 100) || "",
        image:
          (
            layouts.find(({ type }) => type === "image")?.layout?.image
              ?.images as ImageDocument[]
          ).at(0)?.url || "",
        keywords: meta.tags,
        wordCount: 500
      }
    }
  };

  return (
    <>
      {/* SCHEMA SCRIPTS ===================== */}
      <SchemaOrgScripts
        data={schemaData}
        pageType="BlogArticle"
        url="" // redundant for blogs
      />

      <div className="grid grid-cols-1 overflow-x-hidden auto-rows-min sm:grid-cols-[2fr_1fr] md:grid-cols-[1fr_290px] gap-x-7 max-1200:px-3 pb-4">
        {/* -------[ TOP SECTION ]--------------------------------- */}
        <section className="flex flex-col justify-start pb-6">
          {/* title ================================================= */}
          <div className="mt-8 sm:mt-4 pb-3.5 flex flex-col sm:flex-row items-center gap-y-2.5 *:text-center justify-center sm:justify-between gap-x-4">
            <BlogH1Heading title={heading} />
            <BlogShareButton link={`${DOMAIN}/blog/${slug}`} />
          </div>
        </section>

        <span></span>

        {/* -------[ ARTICLE SECTION ]--------------------------------- */}
        <LocationProvider>
          <div className="flex flex-col justify-start gap-y-3.5">
            {previewRawString.map((subArticle, index) =>
              typeof subArticle === "string" ? (
                <BlogArticleContent
                  innerHTML={subArticle}
                  key={index}
                />
              ) : (
                <BoxTheme
                  key={index}
                  className="sm:max-w-[882px]"
                >
                  <FrontendProductTiles
                    productList={subArticle}
                    type="scrollable"
                    sync
                  />
                </BoxTheme>
              )
            )}

            {faqData ? (
              <>
                <div className="mt-12 max-sm:mb-5">
                  <span className={"text-xl font-medium mb-3 "}>
                    Frequently Asked Questions
                  </span>
                  <FAQs faqData={faqData} />
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="pt-8 grid grid-cols-1 sm:grid-cols-[125px_1fr]  gap-x-1.5 gap-y-2 sm:gap-y-4">
              <span className="flex items-center justify-start gap-1.5">
                <UserRound
                  strokeWidth={1.5}
                  width={18}
                  className="mr-1"
                />
                <span>Author:</span>
              </span>
              <span className="font-medium ml-7 sm:ml-1">
                {(author as BlogAuthorDocument)?.name || "Anonymous"}
              </span>

              {categories && categories.length ? (
                <>
                  <span className="flex items-start justify-start gap-1.5 max-sm:mt-3">
                    <PaintBucket
                      strokeWidth={1.5}
                      width={18}
                    />
                    <span className="mr-3.5">Categories:</span>
                  </span>
                  <BlogTags
                    tags={(categories as BlogCategoryDocument[]).map(
                      ({ _id, name }) => ({
                        label: name,
                        path: `/blog/category/${_id}`
                      })
                    )}
                    showAll
                  />
                </>
              ) : (
                <></>
              )}

              {tags && tags.length ? (
                <>
                  <span className="flex items-start justify-start gap-1.5 max-sm:mt-3">
                    <Tag
                      strokeWidth={1.5}
                      width={18}
                    />
                    <span className="mr-3.5">Tags:</span>
                  </span>
                  <BlogTags
                    tags={(tags as BlogTagDocument[]).map(({ name }) => ({
                      label: name,
                      path: "/blog"
                    }))}
                    showAll
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </LocationProvider>

        {/* -------[ RIGHT SIDE ]--------------------------------- */}
        <section className="grid grid-cols-1 sm:grid-cols-[28px_1fr]">
          <span className="border-l border-charcoal-3/20 max-sm:hidden" />
          <div className="flex flex-col justify-start max-sm:hidden">
            {/* <BlogCards
              title="Related Blogs"
              blogs={(_relatedArticles as BlogArticleDocument[]) || []}
              atSideSection
            />
            <BlogCards
              title="Latest Blogs"
              blogs={(_latestArticles as BlogArticleDocument[]) || []}
              atSideSection
            /> */}
          </div>
        </section>
      </div>
    </>
  );
}
