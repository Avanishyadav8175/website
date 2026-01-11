// utils
import { getEmbeddedYoutubeURL } from "../../utils/getEmbeddedYoutubeURL";

// types
import { type BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";

// styles
import styles from "../../styles/blogLayoutVideo.module.scss";

export default function BlogLayoutVideo({
  layout
}: {
  layout: BlogLayoutDocument;
}) {
  const src = getEmbeddedYoutubeURL(layout?.video || "");

  if (src) {
    return (
      <div className={styles.blogVideo}>
        <iframe
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return <></>;
}
