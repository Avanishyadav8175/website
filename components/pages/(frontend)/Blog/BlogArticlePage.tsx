// libraries
import moment from "moment";

// constants
import { DOMAIN, GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// utils

// components
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import BlogCategories from "@/components/(frontend)/blog/BlogCategories";
import BlogShare from "@/components/(frontend)/blog/BlogShare";
import BlogLayout from "@/components/(frontend)/blog/layout/BlogLayout";
import { GoogleAnalytics } from "@next/third-parties/google";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { type BlogTagDocument } from "@/common/types/documentation/blog/blogTag";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type SchemaDataType } from "@/common/types/seoTypes";

function BlogArticlePage({
  article
}: {
  article: BlogArticleDocument;
}) {
  const { heading, slug, layouts: unsortedLayouts, meta, createdAt } = article;

  const url = `${DOMAIN}/blog/${slug}`;
  const author = article.author as BlogAuthorDocument | null;
  const categories = article.categories as BlogCategoryDocument[];
  const tags = article.tags as BlogTagDocument[];
  const layouts = [...unsortedLayouts].sort((a, b) => a.order - b.order);

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
        url
      },
      blogPosting: {
        url,
        authorName: author?.name || "Anonymous",
        description: meta.description || "",
        headline: heading,
        publishedOn: moment(createdAt).format("DD MMMM YYYY"),
        body:
          layouts
            .find(({ type }) => type === "text")
            ?.layout.text?.split(" ")
            .filter((str) => !str.startsWith("<") || !str.endsWith(">"))
            .slice(0, 40)
            .join(" ") || "",
        image:
          (
            layouts.find(({ type }) => type === "image")?.layout?.image
              ?.images as ImageDocument[]
          ).at(0)?.url || "",
        keywords: meta.tags,
        wordCount: layouts
          .filter(({ type }) => type === "text")
          .map(({ layout }) => layout.text?.length || 0)
          .reduce((sum, val) => (sum += val), 0)
      }
    }
  };

  // const latestBlogs: BlogCardType[] =
  //   (article?._suggestions?.latest as BlogArticleDocument[])
  //     ?.filter(({ slug }) => slug !== article.slug)
  //     ?.slice(0, 5)
  //     ?.map(({ heading, slug, layouts, author }) => ({
  //       title: heading,
  //       path: `/blog/${slug}`,
  //       coverImage: extractBlogCoverImage(layouts),
  //       authorName: (author as BlogAuthorDocument).name
  //     })) || [];

  // const relatedBlogs: BlogCardType[] =
  //   (article?._suggestions?.related as BlogArticleDocument[])
  //     ?.filter(({ slug }) => slug !== article.slug)
  //     ?.slice(0, 5)
  //     ?.map(({ heading, slug, layouts, author }) => ({
  //       title: heading,
  //       path: `/blog/${slug}`,
  //       coverImage: extractBlogCoverImage(layouts),
  //       authorName: (author as BlogAuthorDocument).name
  //     })) || [];

  return (
    <>
      <SchemaOrgScripts
        data={schemaData}
        pageType="BlogArticle"
        url=""
      />
      <article className="relative grid grid-cols-1 overflow-x-hidden auto-rows-min sm:px-32 sm:border-x border-charcoal-3/20 max-1200:px-3 pt-2 pb-10 sm:pt-10 sm:pb-20">
        <section className="flex flex-col justify-start pb-10">
          <div className="mt-8 sm:mt-4 pb-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-y-2.5 justify-between gap-x-4">
            <h1 className="text-2xl sm:text-3xl font-medium">{heading}</h1>
            <BlogShare url={url} />
          </div>
          {categories.length && <BlogCategories categories={categories} />}
        </section>
        {/* <span className="row-span-2 flex flex-col justify-start gap-y-5 max-sm:hidden border-l border-charcoal-3/15 pl-7 pr-2.5">
          {Boolean(relatedBlogs.length) && (
            <>
              <div className="text-charcoal-3 font-medium text-lg text-center pt-3.5">
                Related Blogs
              </div>
              {relatedBlogs.map((card) => (
                <BlogCard
                  key={uuid()}
                  card={card}
                />
              ))}
            </>
          )}
          {Boolean(latestBlogs.length) && (
            <>
              <div className="text-charcoal-3 font-medium text-lg text-center pt-3.5">
                Latest Blogs
              </div>
              {latestBlogs.map((card) => (
                <BlogCard
                  key={uuid()}
                  card={card}
                />
              ))}
            </>
          )}
        </span> */}
        <div />
        <section className="flex flex-col justify-start gap-y-3.5">
          {layouts.map((layout) => (
            <BlogLayout
              key={layout._id as string}
              layout={layout}
            />
          ))}
          {/* <section className="pt-8 grid grid-cols-1 sm:grid-cols-[125px_1fr]  gap-x-1.5 gap-y-2 sm:gap-y-4">
            <BlogAuthor name={author.name} />
            {categories.length && <BlogCategories categories={categories} />}
            {tags.length && <BlogTags tags={tags} />}
          </section> */}
        </section>
      </article>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}

export default BlogArticlePage;
