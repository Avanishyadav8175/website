// styles
import design from "../decorators/blogData.module.scss";
import "../decorators/blogMediaLayout.scss";

export default function BlogArticleContent({
  innerHTML
}: {
  innerHTML: string;
}) {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      className={`${design.blogArticle}`}
    />
  );
}
