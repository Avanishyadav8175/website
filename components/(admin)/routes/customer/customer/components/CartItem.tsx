// libraries
import moment from "moment";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import {
  createDeliveryTypeAction,
  selectDeliveryType
} from "@/store/features/presets/deliveryTypeSlice";

// components
import Image from "next/image";
import CartItemAddons from "./CartItemAddons";
import CartItemCustomization from "./CartItemCustomization";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { INRSymbol } from "@/common/constants/symbols";

export default function CartItem({
  orderItem: {
    status,
    content: contentId,
    pricePerUnit,
    quantity,
    delivery,
    instruction,
    addons: itemAddons,
    customization
  }
}: {
  orderItem: CartItemDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const contentStatus = useSelector(selectContent.status);

  const { documents: contents } = useSelector(selectContent.documentList);

  const imageStatus = useSelector(selectImage.status);

  const { documents: images } = useSelector(selectImage.documentList);

  const deliveryTypeStatus = useSelector(selectDeliveryType.status);

  const { documents: deliveryTypes } = useSelector(
    selectDeliveryType.documentList
  );

  // variables
  const content = contents.find(({ _id }) => _id === contentId);
  const primaryImage = images.find(
    ({ _id }) => _id === content?.media?.primary
  );
  const deliveryType = deliveryTypes.find(({ _id }) => _id === delivery.type);
  const deliverySlot = deliveryType?.timeSlots.find(
    ({ _id }) => _id === delivery.slot
  );

  // side effects
  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (deliveryTypeStatus === "idle") {
      dispatch(createDeliveryTypeAction.fetchDocumentList());
    }
  }, [deliveryTypeStatus, dispatch]);

  return (
    <section
      className={`flex flex-col gap-2 px-0 py-5 border-b border-dashed border-charcoal-3/40`}
    >
      {content && (
        <section className="grid grid-cols-[60px_1fr] sm:grid-cols-[86px_1fr_auto_90px] auto-rows-min gap-x-4">
          <div className="bg-charcoal-3/20 rounded-xl overflow-hidden relative aspect-square">
            {primaryImage && (
              <Image
                className="w-full h-full object-cover object-center"
                src={primaryImage.url}
                alt={primaryImage.alt || primaryImage.defaultAlt || "Image"}
                width={150}
                height={150}
                unoptimized={!OPTIMIZE_IMAGE}
                decoding="async"
                draggable={false}
              />
            )}
          </div>
          <div className="flex flex-col justify-start gap-0 relative">
            <span className="font-medium text-[17px] sm:py-1">
              {content.name}
            </span>
            <span className="text-[17px] font-medium sm:hidden">
              {INRSymbol}
              {pricePerUnit}
              {quantity >= 1 ? ` x${quantity}` : "x0"}
            </span>
            <span className="text-sm text-charcoal-3 max-sm:hidden">
              Quantity: {quantity >= 1 ? ` x${quantity}` : "x0"}
            </span>
            <span className="text-sm text-charcoal-3 max-sm:hidden">
              Booking for: {moment(delivery.date).format("DD MMM YYYY")} (
              {deliverySlot?.label || ""})
            </span>
            <span className="text-sm text-charcoal-3 sm:hidden">
              Date: {moment(delivery.date).format("DD MMM YYYY")}
            </span>
            <span className="text-sm text-charcoal-3 sm:hidden">
              Time: {deliverySlot?.label || ""} (
              {deliveryType?.name.split(" ")[0] || ""})
            </span>
            {/* CUSTOMIZATIONS IF ANY ------------------ */}
            {customization && (
              <CartItemCustomization customization={customization} />
            )}
            {/* INSTRUCTIONS IF ANY ------------------ */}
            {instruction && instruction.length > 0 && (
              <span className="text-sm text-charcoal-3">
                Instruction: {instruction || ""}
              </span>
            )}
          </div>

          {/* DELIVERY TYPE ----------------- */}
          <div className="max-sm:hidden flex flex-col justify-start gap-y-3.5">
            <div className="text-white text-[13px] mt-2 bg-sienna py-0.5 px-3 rounded-lg h-fit">
              {deliveryType?.name || ""}
            </div>
          </div>

          {/* PRICE PER UNIT ----------------- */}
          <div className="font-medium text-right mt-2 max-sm:hidden">
            {INRSymbol}
            {pricePerUnit}
          </div>
        </section>
      )}

      {/* ADDONS IF ANY ---------------------- */}
      {itemAddons && Boolean(itemAddons.length) && (
        <CartItemAddons itemAddons={itemAddons} />
      )}
    </section>
  );
}
