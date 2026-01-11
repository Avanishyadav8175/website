// libraries
// Removed mongoose import to prevent client-side build errors
import generateObjectId from "@/common/utils/client/generateObjectId";

// hooks
import { memo, useCallback } from "react";

// components
import ContentAddonItem from "./ContentAddonItem";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";

function ContentAddonItems({
  contentAddons,
  cartItemAddons,
  onChangeCartItemAddons
}: {
  contentAddons: ContentAddonDocument[];
  cartItemAddons: CartItemAddonDocument[];
  onChangeCartItemAddons: (cartItemAddons: CartItemAddonDocument[]) => void;
}) {
  // event handlers
  const handleAdd = useCallback(
    (contentAddon: ContentAddonDocument) => {
      const existingCartAddon = cartItemAddons.find(
        ({ addon }) =>
          (addon as AddonDocument)._id ===
          (contentAddon.addon as AddonDocument)._id
      );

      if (existingCartAddon) {
        onChangeCartItemAddons(
          [...cartItemAddons].map((cartItemAddon) => {
            if (
              (cartItemAddon.addon as AddonDocument)._id ===
              (contentAddon.addon as AddonDocument)._id
            ) {
              const newCartItemAddon = {
                ...cartItemAddon,
                quantity: cartItemAddon.quantity + 1
              } as CartItemAddonDocument;

              return newCartItemAddon;
            }

            return cartItemAddon;
          })
        );
      } else {
        onChangeCartItemAddons([
          ...cartItemAddons,
          {
            _id: generateObjectId() as any,
            addon: contentAddon.addon as AddonDocument,
            quantity: 1,
            pricePerUnit: (contentAddon.addon as AddonDocument).price
          } as CartItemAddonDocument
        ]);
      }
    },
    [cartItemAddons, onChangeCartItemAddons]
  );

  const handleRemove = useCallback(
    (contentAddon: ContentAddonDocument) => {
      const existingCartItemAddon = cartItemAddons.find(
        ({ addon }) =>
          (addon as AddonDocument)._id ===
          (contentAddon.addon as AddonDocument)._id
      ) as CartItemAddonDocument;

      if (existingCartItemAddon) {
        if (existingCartItemAddon?.quantity === 1) {
          onChangeCartItemAddons(
            cartItemAddons.filter(
              (cartItemAddon) =>
                (cartItemAddon.addon as AddonDocument)._id !==
                (contentAddon.addon as AddonDocument)._id
            )
          );
        } else {
          onChangeCartItemAddons(
            [...cartItemAddons].map((cartItemAddon) => {
              if (
                (cartItemAddon.addon as AddonDocument)._id ===
                (contentAddon.addon as AddonDocument)._id
              ) {
                const newCartItemAddon = {
                  ...cartItemAddon,
                  quantity: cartItemAddon.quantity - 1
                } as CartItemAddonDocument;

                return newCartItemAddon;
              }

              return cartItemAddon;
            })
          );
        }
      }
    },
    [cartItemAddons, onChangeCartItemAddons]
  );

  return (
    <div className="relative min-h-device sm:min-h-[500px] grid z-10 max-sm:grid-cols-2 auto-rows-min grid-cols-6  gap-2 p-2 sm:gap-3 sm:p-3">
      {contentAddons.map((contentAddon) => {
        const cartItemAddon = cartItemAddons.find(
          ({ addon }) =>
            (addon as AddonDocument)._id ===
            (contentAddon.addon as AddonDocument)._id
        );

        return (
          <ContentAddonItem
            key={contentAddon._id as string}
            contentAddon={contentAddon}
            isSelected={Boolean(cartItemAddon)}
            count={cartItemAddon?.quantity || 0}
            onAdd={() => {
              handleAdd(contentAddon);
            }}
            onRemove={() => {
              handleRemove(contentAddon);
            }}
          />
        );
      })}
    </div>
  );
}

export default memo(ContentAddonItems);
