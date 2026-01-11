// config
import { QUICK_BUILD } from "@/config/quickBuild";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// vercel - Next.js requires literal string, not constant reference
export const dynamic = "auto";

// requests
import { fetchBlogCount } from "@/request/blog/blogCount";
import { fetchBlogPageArticles } from "@/request/blog/blogPageArticles";

// constants
import { BLOG_ARTICLE_PER_PAGE } from "@/common/constants/limits";
import { CANONICAL_LINK } from "@/common/constants/meta";

// utils
import { notFound } from "next/navigation";

// components
import BlogPage from "@/components/pages/(frontend)/Blog/BlogPage";

// types
import { COMPANY_NAME } from "@/common/constants/companyDetails";
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";

export const metadata = {
  title: COMPANY_NAME + ": Blogs",
  description: ``,
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  keywords: [],
  alternates: {
    canonical: CANONICAL_LINK
  }
};

export async function generateStaticParams() {
  if (RENDERING_STRATEGY === "ISR") {
    try {
      const response = await fetchBlogCount(RENDERING_STRATEGY);

      const blogs = response.data || 0;
      const pages = QUICK_BUILD ? 1 : Math.ceil(blogs / BLOG_ARTICLE_PER_PAGE);

      return Array.from({ length: pages }).map((num) => ({ id: num }));
    } catch (error) {
      return [];
    }
  }

  return [];
}

async function getPageArticles(page: number) {
  try {
    const response = await fetchBlogPageArticles(page, RENDERING_STRATEGY);

    if (response?.data) {
      return {
        count: response.count as number,
        articles: response.data as BlogArticleDocument[]
      };
    }
  } catch (error) {
    return null;
  }

  return null;
}

export default async function BlogPages({
  params
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNo = Number(page) || 1;
  const result = await getPageArticles(pageNo);

  if (!result) {
    notFound();
  }

  return (
    <BlogPage
      count={Math.ceil(result.count / BLOG_ARTICLE_PER_PAGE)}
      page={pageNo}
      blogs={result.articles}
    />
  );
}
