// utils
import { getDecodedHTML } from "../../utils/getDecodedHTML";

// types
import { type BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";

// styles
import styles from "../../styles/blogLayoutText.module.scss";

export default function BlogLayoutText({
  layout
}: {
  layout: BlogLayoutDocument;
}) {
  const html = getDecodedHTML(layout?.text || "");

  if (html) {
    return (
      <article
        className={`${styles.blogText}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <></>;
}
