// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createEnhancementAction,
  selectEnhancement
} from "@/store/features/presets/enhancementSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// components
import Image from "next/image";

// types
import { type CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { OPTIMIZE_IMAGE } from "@/config/image";

export default function OrderItemEnhancement({
  itemEnhancement: { label, items }
}: {
  itemEnhancement: CartItemEnhancementDocument;
}) {
  const dispatch = useDispatch();

  const enhancementStatus = useSelector(selectEnhancement.status);

  const { documents: enhancements } = useSelector(
    selectEnhancement.documentList
  );

  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector(selectImage.documentList);

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (enhancementStatus === "idle") {
      dispatch(createEnhancementAction.fetchDocumentList());
    }
  }, [enhancementStatus, dispatch]);

  return (
    <section className="flex flex-col gap-2">
      <span className="text-lg font-semibold underline">{label}</span>
      <section className="grid grid-cols-[1fr_1fr_1fr] gap-2">
        {items.map(({ enhancement: enhancementId, price }, i) => {
          const enhancement = enhancements.find(
            ({ _id }) => _id === enhancementId
          );
          const image = images.find(({ _id }) => _id === enhancement?.image);

          return (
            <article
              key={i}
              className="p-2 bg-charcoal-3/20 rounded-md"
            >
              {enhancement && (
                <section className="flex gap-3">
                  <div>
                    {image ? (
                      <Image
                        className="rounded-md"
                        src={image.url}
                        alt={image.alt || image.defaultAlt || "Image"}
                        width={80}
                        height={80}
                        unoptimized={!OPTIMIZE_IMAGE}
                        decoding="async"
                      />
                    ) : (
                      <div className="w-[80px] h-[80px] bg-neutral-600 rounded-md"></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {enhancement.label || ""}
                    </span>
                    <span>{`₹ ${price}`}</span>
                  </div>
                </section>
              )}
            </article>
          );
        })}
      </section>
    </section>
  );
}
