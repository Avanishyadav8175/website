// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// requests
import { addCustomizationImages } from "@/request/media/customizationImage";

// components
import CustomizationImageForm from "./components/CustomizationImageForm";
import Image from "next/image";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";

export default function CustomizationImageUpload({
  contentName,
  images,
  maxCount,
  onChangeImages
}: {
  contentName: string;
  images: CustomizationImageDocument[];
  maxCount: number;
  onChangeImages: (images: CustomizationImageDocument[]) => void;
}) {
  const handleUpload = (imagesToBeUploaded: CustomizationImageDocument[]) => {
    addCustomizationImages(imagesToBeUploaded).then(
      ({ data: uploadedImages }) => {
        onChangeImages([
          ...images,
          ...(uploadedImages as CustomizationImageDocument[])
        ]);
      }
    );
  };

  return (
    <div className="flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-col items-start justify-start">
        <span className="flex items-center justify-start gap-1 text-lg font-medium">
          <span className="text-moss">{"Upload "}</span>
          <span>{maxCount === 1 ? "an image" : `upto ${maxCount} images`}</span>
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
      <CustomizationImageForm
        contentName={contentName}
        limit={maxCount - images.length}
        onUpload={handleUpload}
      />
    </div>
  );
}
