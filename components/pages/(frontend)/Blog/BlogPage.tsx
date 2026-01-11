// libraries
import moment from "moment";

// constants
import { DOMAIN } from "@/common/constants/domain";
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// components
import BlogCards from "@/components/(blog)/content/BlogPage/components/BlogCards";
// import { FeaturedBlogs } from "@/components/(blog)/content/BlogPage/components/FeaturedBlogs";
import { SchemaOrgScripts } from "@/common/utils/schema/SchemaOrgScripts";
import FrontendPagination from "@/components/(_common)/pagination/FrontendPagination";
import { GoogleAnalytics } from "@next/third-parties/google";

// types
import { COMPANY_NAME } from "@/common/constants/companyDetails";
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type SchemaDataType } from "@/common/types/seoTypes";

export default async function BlogPage({
  count,
  page,
  blogs
}: {
  count: number;
  page: number;
  blogs: BlogArticleDocument[];
}) {
  const schemaData: SchemaDataType = {
    BlogsPage: {
      webpage: {
        name: COMPANY_NAME + " Blogs",
        alternateName: COMPANY_NAME + ` Blogs Page ${page}`,
        image:
          blogs.length > 0
            ? blogs
              .map(
                ({ layouts }) =>
                  (
                    layouts.find(({ type }) => type === "image")?.layout
                      ?.image?.images as ImageDocument[]
                  ).at(0)?.url
              )
              .filter((x) => x !== undefined)
              .at(0) || ""
            : "",
        url: `${DOMAIN}/blog/page/${page}`
      },
      blog: {
        name: `${COMPANY_NAME} Blogs Page ${page}`,
        description: `${COMPANY_NAME} Blogs Page ${page}`,
        publisherName: COMPANY_NAME,
        url: `${DOMAIN}/blog/page/${page}`,
        posts: blogs.map((blog) => ({
          url: `${DOMAIN}${blog.slug.startsWith("/") ? blog.slug : "/" + blog.slug}`,
          authorName: (blog.author as BlogAuthorDocument)?.name || "Anonymous",
          description: blog.meta?.description || "",
          headline: blog.heading || "",
          publishedOn: moment(blog.createdAt).format("DD MM YYYY")
        }))
      }
    }
  };

  return (
    <>
      <SchemaOrgScripts
        data={schemaData}
        url="" // redundant for blogs type
        pageType="BlogsPage"
      />

      <h1 className="visually-hidden">{COMPANY_NAME} Blogs</h1>

      <div className="flex flex-col justify-start gap-y-8 mb-10 min-h-[calc(100dvh_-_480px)]">
        {/* <FeaturedBlogs blogArticles={allBlogs.slice(0, 5)} /> */}
        <BlogCards
          title={`${COMPANY_NAME} Blogs`}
          blogs={blogs}
        />
        <FrontendPagination
          count={count}
          page={page}
          path={`/blog/page`}
        />
      </div>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
