// components
import BlogLayoutContent from "./components/BlogLayoutContent";
import BlogLayoutFAQ from "./components/BlogLayoutFAQ";
import BlogLayoutImage from "./components/BlogLayoutImage";
import BlogLayoutText from "./components/BlogLayoutText";
import BlogLayoutVideo from "./components/BlogLayoutVideo";

// types
import { type BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";

export default function BlogLayout({
  layout: { type, layout }
}: {
  layout: BlogLayoutItemDocument;
}) {
  switch (type) {
    case "content":
      return <BlogLayoutContent layout={layout} />;

    case "faq":
      return <BlogLayoutFAQ layout={layout} />;

    case "image":
      return <BlogLayoutImage layout={layout} />;

    case "text":
      return <BlogLayoutText layout={layout} />;

    case "video":
      return <BlogLayoutVideo layout={layout} />;

    default:
      return <></>;
  }
}
