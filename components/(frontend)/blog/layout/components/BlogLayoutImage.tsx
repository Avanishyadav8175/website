// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// components
import Image from "next/image";

// types
import { type BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import { type ImageDocument } from "@/common/types/documentation/media/image";

// styles
import "../../styles/blogLayoutImage.scss";

export default function BlogLayoutImage({
  layout
}: {
  layout: BlogLayoutDocument;
}) {
  if (layout?.image) {
    const blogLayoutImage = layout.image;
    const shape = blogLayoutImage?.shape || "";
    const style = blogLayoutImage?.style || "";
    const images = (blogLayoutImage?.images as ImageDocument[]) || [];

    if (images.length) {
      return (
        <div className={`blog-image ${shape} ${style}`}>
          {images.map(({ _id, alt, defaultAlt, url }) => (
            <Image
              className="h-full object-center object-contain w-full"
              key={_id as string}
              src={url}
              alt={alt || defaultAlt}
              width={500}
              height={500}
              unoptimized
            />
          ))}
        </div>
      );
    }
  }

  return <></>;
}
