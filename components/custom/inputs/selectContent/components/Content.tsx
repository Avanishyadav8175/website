// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// components
import Image from "next/image";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export default function Content({
  content,
  isSelected,
  onToggleSelect
}: {
  content: ContentDocument;
  isSelected: boolean;
  onToggleSelect: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector(selectImage.documentList);

  // variables
  const image = images.find(({ _id }) => _id === content.media.primary);

  // effects
  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  return (
    <div
      className={`relative flex flex-col items-center justify-start gap-3 p-2 ${isSelected ? "bg-sky-300" : "bg-zinc-200"} rounded-xl transition-all duration-200 cursor-pointer`}
      onClick={onToggleSelect}
    >
      <section
        className={`w-full flex flex-col items-stretch justify-start gap-3`}
      >
        <span className="aspect-square rounded-xl overflow-hidden w-full *:w-full *:h-full">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || image.defaultAlt || "Content Image"}
              width={160}
              height={160}
              unoptimized={!OPTIMIZE_IMAGE}
              decoding="async"
            />
          ) : (
            <div className="w-[160px] h-[160px] bg-slate-500"></div>
          )}
        </span>

        <section
          className={`w-full flex flex-col items-stretch justify-start `}
        >
          <div className={`text-[15px] font-semibold truncate`}>
            {content.name}
          </div>
          <span
            className={`text-[15px] font-medium`}
          >{`₹ ${content.price?.base.price}`}</span>
        </section>
      </section>
    </div>
  );
}
