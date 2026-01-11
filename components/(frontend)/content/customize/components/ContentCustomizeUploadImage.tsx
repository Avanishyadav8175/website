// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// requests
import { addCustomizationImages } from "@/request/media/customizationImage";

// hooks
import { memo, useCallback, useMemo } from "react";

// components
import ContentCustomizeSection from "./ContentCustomizeSection";
import ContentCustomizeUploadImageForm from "./ContentCustomizeUploadImageForm";
import Image from "next/image";

// types
import { type CartItemUploadedImageDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedImage";
import { type ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { type LabelDocument } from "@/common/types/documentation/presets/label";

function ContentCustomizeUploadImage({
  contentName,
  uploadImage: { label, imageLimit },
  cartItemUploadedImage,
  onChangeCartItemUploadedImage
}: {
  contentName: string;
  uploadImage: ContentCustomizationUploadImageDocument;
  cartItemUploadedImage?: CartItemUploadedImageDocument;
  onChangeCartItemUploadedImage: (
    cartItemUploadedImage?: CartItemUploadedImageDocument
  ) => void;
}) {
  // variables
  const title = useMemo(() => (label as LabelDocument).label, [label]);
  const images = useMemo(
    () => (cartItemUploadedImage?.images as CustomizationImageDocument[]) || [],
    [cartItemUploadedImage]
  );

  // event handlers
  const handleUpload = useCallback(
    (imagesToBeUploaded: CustomizationImageDocument[]) => {
      addCustomizationImages(imagesToBeUploaded).then(
        ({ data: uploadedImages }) => {
          onChangeCartItemUploadedImage({
            label: title,
            images: [
              ...images,
              ...(uploadedImages as CustomizationImageDocument[])
            ]
          } as CartItemUploadedImageDocument);
        }
      );
    },
    [images, title, onChangeCartItemUploadedImage]
  );

  return (
    <ContentCustomizeSection title={title}>
      <div className="flex flex-col items-stretch justify-start gap-4">
        <div className="flex flex-col items-start justify-start">
          <span className="flex items-center justify-start gap-1 text-lg font-medium">
            <span className="text-moss">{"Upload "}</span>
            <span>
              {imageLimit === 1 ? "an image" : `upto ${imageLimit} images`}
            </span>
          </span>
          <span className="text-xs text-charcoal-3/60">
            {"Max size per image: 300KB"}
          </span>
        </div>
        <div className="flex items-center justify-center min-h-[100px] border-[2px] border-dashed rounded-2xl text-ash-3/90 font-medium p-2">
          {images.length ? (
            <section className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2">
              {images.map(({ _id, url }, i) => (
                <Image
                  className="w-[80px] h-[80px] object-cover rounded-lg"
                  key={_id as string}
                  src={url}
                  alt={`Customization Image`}
                  width={80}
                  height={80}
                  unoptimized={!OPTIMIZE_IMAGE}
                />
              ))}
            </section>
          ) : (
            <div>No Image</div>
          )}
        </div>
        <ContentCustomizeUploadImageForm
          contentName={contentName}
          limit={imageLimit ? imageLimit - images.length : 0}
          onUpload={handleUpload}
        />
      </div>
    </ContentCustomizeSection>
  );
}

export default memo(ContentCustomizeUploadImage);
