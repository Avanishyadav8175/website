// constants
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchBlogArticleData } from "@/request/blog/blogArticleData";
import { fetchBlogArticleMeta } from "@/request/blog/blogArticleMeta";
import { fetchBlogArticles } from "@/request/blog/blogArticles";

// utils
import { createMetadata } from "@/common/utils/createMetadata";
import { notFound } from "next/navigation";

// components
import BlogArticlePage from "@/components/pages/(frontend)/Blog/BlogArticlePage";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      const response = await fetchBlogArticles(RENDERING_STRATEGY);

      const blogArticles =
        response && response?.data
          ? (response.data as BlogArticleDocument[])
          : [];

      const blogArticleSlugs = blogArticles
        .slice(0, QUICK_BUILD ? 1 : blogArticles.length)
        .map(({ slug }) => slug);

      return blogArticleSlugs;
    } catch (error) {
      return [];
    }
  }

  return [];
}

export async function generateMetadata(
  {
    params
  }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = (await params).slug;

    const response = await fetchBlogArticleMeta(slug, RENDERING_STRATEGY);

    if (response.data) {
      const path = `/blog/${slug}`;
      const meta = response.data.meta as SEOMetaDocument;
      const images = [
        ...(response.data.layouts as BlogLayoutItemDocument[])
          ?.filter(({ type }) => type === "image")
          ?.flatMap(({ layout }) =>
            (layout?.image?.images as ImageDocument[])?.map(({ url }) => url)
          )
      ];

      return await createMetadata({
        path,
        meta,
        images,
        parent
      });
    }
  } catch (error) {
    return {} as Metadata;
  }

  return {} as Metadata;
}

async function getBlogArticle(slug: string) {
  try {
    const response = await fetchBlogArticleData(slug, RENDERING_STRATEGY);

    if (response?.data) {
      return response.data as BlogArticleDocument;
    }
  } catch (error) {
    return { error: "Not Found" };
  }

  return { error: "Not Found" };
}

export default async function FrontendBlogContent({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogArticleData = await getBlogArticle(slug);

  // @ts-ignore
  if (!blogArticleData || blogArticleData?.error) {
    return notFound();
  }

  return <BlogArticlePage article={blogArticleData as BlogArticleDocument} />;
}
