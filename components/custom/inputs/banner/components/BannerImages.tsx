// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialBannerImageValue } from "../utils/getInitialBannerImageValue";

// components
import BannerImage from "./BannerImage";

// types
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";

export default function BannerImages({
  isRequired,
  performReset,
  images,
  onChangeImages
}: {
  isRequired?: boolean;
  performReset?: boolean;
  images: BannerImageDocument[];
  onChangeImages: (newValue: BannerImageDocument[]) => void;
}) {
  const handleAddImage = () => {
    onChangeImages([...images, getInitialBannerImageValue()]);
  };

  const handleDeleteImage = (imageId: string) => {
    if (images.length === 1) {
      onChangeImages([getInitialBannerImageValue()]);
    } else {
      onChangeImages([...images].filter(({ _id }) => _id !== imageId));
    }
  };

  return (
    <section className="flex flex-col gap-8 justify-start pb-5">
      {images.map((image, i) => (
        <BannerImage
          key={i}
          index={i}
          image={image}
          onChangeImage={(newImage) => {
            onChangeImages(
              [...images].map((image) =>
                image._id === newImage._id ? newImage : image
              )
            );
          }}
          onDeleteImage={() => {
            handleDeleteImage(image._id as string);
          }}
        />
      ))}
      <div
        onClick={handleAddImage}
        className="w-full flex items-center justify-center gap-1.5 bg-teal-200 border border-teal-400 text-teal-500 hover:bg-teal-600 hover:text-white hover:border-transparent py-2 cursor-pointer rounded-xl transition-all duration-300"
      >
        <Plus
          strokeWidth={1.5}
          width={18}
          height={18}
        />
        <span>Add another</span>
      </div>
    </section>
  );
}
