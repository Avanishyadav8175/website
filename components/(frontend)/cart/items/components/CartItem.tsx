// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// utils
import { getCustomVariant } from "@/hooks/useOptimizedCart/utils/getCustomVariant";

// hooks
import { useState } from "react";

// components
import CartItemAction from "./CartItemAction";
import CartItemAddons from "./CartItemAddons";
import CartItemAddonSuggestions from "./CartItemAddonSuggestions";
import CartItemConfirmDelete from "./CartItemConfirmDelete";
import CartItemCustomization from "./CartItemCustomization";
import CartItemDeliveryDate from "./CartItemDeliveryDate";
import CartItemDeliveryTime from "./CartItemDeliveryTime";
import CartItemImage from "./CartItemImage";
import CartItemInstruction from "./CartItemInstruction";
import CartItemName from "./CartItemName";
import CartItemPrice from "./CartItemPrice";
import CartItemUploadedText from "./CartItemUploadedText";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function CartItem({
  item,
  onChangeItem,
  onDeleteItem
}: {
  item: CartItemDocument;
  onChangeItem: (item: CartItemDocument) => void;
  onDeleteItem: (itemId: string) => void;
}) {
  //   states
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  // variables
  const content = item.content as ContentDocument;

  const customVariant = item.customVariant
    ? getCustomVariant({ content, variantId: item.customVariant })
    : undefined;

  const name = customVariant?.name || content.name;

  const imageUrl =
    customVariant?.image?.url || (content.media.primary as ImageDocument)?.url || "";

  const path = `${DOMAIN}${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`;

  // event handlers
  const handleChangeQuantity = (quantity: number) => {
    onChangeItem({
      ...item,
      quantity
    } as CartItemDocument);
  };

  const handleChangeDate = (date: Date) => {
    onChangeItem({
      ...item,
      delivery: {
        ...item.delivery,
        date: date.toISOString()
      }
    } as CartItemDocument);
  };

  const handleChangeTime = (
    type: DeliveryTypeDocument,
    slot: TimeSlotDocument
  ) => {
    onChangeItem({
      ...item,
      delivery: {
        ...item.delivery,
        type,
        slot
      }
    } as CartItemDocument);
  };

  const handleChangeAddons = (addons: CartItemAddonDocument[]) => {
    onChangeItem({
      ...item,
      addons
    } as CartItemDocument);
  };

  const handleChangeInstruction = (instruction: string) => {
    onChangeItem({
      ...item,
      instruction
    } as CartItemDocument);
  };

  const handleDelete = () => {
    setIsDeleted(true);

    setTimeout(() => {
      onDeleteItem(item._id as string);
    }, 450);
  };

  return (
    <>
      <section
        className={`grid auto-rows-min  ${isDeleted ? "transition-all duration-300 scale-0" : ""}`}
      >
        <div
          className={`relative z-10 grid *:row-start-1 *:col-start-1 rounded-2xl overflow-hidden max-sm:shadow-light transition-all duration-300`}
        >
          <div
            // onTouchMove={collapseShowingDelete}
            // onTouchEnd={collapseShowingDelete}
            // onClick={collapseShowingDelete}
            className={`z-30 grid grid-cols-[auto_1fr_99px] sm:grid-cols-[auto_1fr_150px] grid-rows-[repeat(9,auto)] sm:grid-rows-[repeat(9,auto)] gap-x-2.5 sm:gap-x-3.5 auto-rows-min bg-ivory-1 py-2.5 sm:py-3.5 rounded-2xl transition-all duration-300 shadow-light sm:border sm:border-charcoal-3/25 ${showDelete ? "-translate-x-20 sm:-translate-x-28 border-charcoal-3/25" : ""}`}
          >
            <CartItemImage
              contentName={name}
              contentPath={path}
              imageUrl={imageUrl}
              contentEdible={content.edible as EdibleDocument}
            />
            <CartItemName name={name} />
            <CartItemAction
              showDelete={showDelete}
              quantity={item.quantity}
              onChangeShowDelete={setShowDelete}
              onChangeQuantity={handleChangeQuantity}
            />
            <CartItemPrice price={item.pricePerUnit * item.quantity} />
            {Boolean(item?.customization?.uploadedText?.text) && (
              <CartItemUploadedText
                text={item.customization!.uploadedText!.text}
              />
            )}
            <CartItemDeliveryDate
              isAvailableInAllIndia={
                content.availability!.availableAt === "all-india"
              }
              date={new Date(item.delivery.date)}
              contentDelivery={content.delivery as ContentDeliveryDocument}
              onChangeDate={handleChangeDate}
            />
            {content.availability!.availableAt === "all-india" ? (
              <></>
            ) : (
              <CartItemDeliveryTime
                date={new Date(item.delivery.date)}
                deliveryType={item.delivery.type as DeliveryTypeDocument}
                timeSlot={item.delivery.slot as TimeSlotDocument}
                contentDelivery={content.delivery as ContentDeliveryDocument}
                onChangeTime={handleChangeTime}
              />
            )}
            <CartItemCustomization customization={item.customization!} />
            <CartItemAddons
              addons={item.addons!}
              onChangeAddons={handleChangeAddons}
            />
            <CartItemInstruction
              instruction={item.instruction}
              onChangeInstruction={handleChangeInstruction}
            />
          </div>
          <CartItemConfirmDelete
            onConfirm={handleDelete}
            onCancel={() => {
              setShowDelete(false);
            }}
          />
        </div>
      </section>
      {/* {Boolean(content.addons) && (
        <CartItemAddonSuggestions
          isDeleted={isDeleted}
          addons={item.addons || []}
          contentAddons={content.addons || []}
          onChangeAddons={handleChangeAddons}
        />
      )} */}
    </>
  );
}
