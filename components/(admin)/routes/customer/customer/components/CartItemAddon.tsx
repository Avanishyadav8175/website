// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAddonAction,
  selectAddon
} from "@/store/features/contents/addonSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

// components
import Image from "next/image";

// types
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { OPTIMIZE_IMAGE } from "@/config/image";

export default function CartItemAddon({
  itemAddon: { addon: addonId, pricePerUnit, quantity, customizationOption }
}: {
  itemAddon: CartItemAddonDocument;
}) {
  const dispatch = useDispatch();

  const addonStatus = useSelector(selectAddon.status);

  const { documents: addons } = useSelector(selectAddon.documentList);

  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector(selectImage.documentList);

  const addon = addons.find(({ _id }) => _id === addonId);
  const image = images.find(({ _id }) => _id === addon?.image);

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (addonStatus === "idle") {
      dispatch(createAddonAction.fetchDocumentList());
    }
  }, [addonStatus, dispatch]);

  if (!addon) return <></>;

  return (
    <section className="p-2 border border-charcoal-3/20 rounded-xl grid grid-cols-[45px_1fr] gap-x-2.5">
      <div className="relative overflow-hidden aspect-square bg-charcoal-3/20 rounded-xl">
        <Image
          className="w-full h-full object-cover object-center"
          src={image?.url || ""}
          alt={image?.alt || image?.defaultAlt || ""}
          width={80}
          height={80}
          unoptimized={!OPTIMIZE_IMAGE}
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="flex flex-col">
        <span className="flex gap-1 text-sm text-charcoal-3">
          <span className="font-medium">{addon.name}</span>
          <span className="font-bold">
            {quantity > 1 ? `x${quantity}` : ""}
          </span>
        </span>
        <span className="font-medium text-charcoal-3">{`₹ ${pricePerUnit}`}</span>
        {/* {customizationOption && <span>{customizationOption || ""}</span>} */}
      </div>
    </section>
  );
}
