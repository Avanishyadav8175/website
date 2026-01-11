// libraries
import { v4 as uuid } from "uuid";

// utils
import { extractBlogCoverImage } from "../utils/extractBlogCoverImage";

// components
import BlogCard from "./BlogCard";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type BlogCard as BlogCardType } from "../types/blogCard";

export default async function BlogCards({
  title,
  blogs,
  atSideSection
}: {
  title: string;
  blogs: BlogArticleDocument[];
  atSideSection?: boolean;
}) {
  if (blogs.length === 0) {
    return <></>;
  }

  const cards: BlogCardType[] = blogs.map(({ heading, slug, layouts, author }) => ({
    title: heading,
    path: `/blog/${slug}`,
    coverImage: extractBlogCoverImage(layouts),
    authorName: (author as BlogAuthorDocument)?.name || "Anonymous"
  }));

  return (
    <section
      className={`flex flex-col justify-start gap-y-3 max-1200:px-3 ${atSideSection ? "" : "pt-10"} `}
    >
      <span
        className={
          atSideSection ? "text-xl mb-2 text-center" : "text-2xl font-medium my-2 text-center"
        }
      >
        {title}
      </span>
      <div
        className={`grid ${atSideSection ? "grid-cols-1 gap-6" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5"} `}
      >
        {cards.map((card) => (
          <BlogCard
            key={uuid()}
            card={card}
          />
        ))}
      </div>
      <div className=""></div>
    </section>
  );
}
