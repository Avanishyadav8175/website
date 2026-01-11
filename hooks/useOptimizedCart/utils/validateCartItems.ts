// utils
import { getCustomVariant } from "./getCustomVariant";
import { isDateExpired } from "@/app/api/frontend/cart/utils/isDateExpired";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export const validateCartItems = ({
  selectedCity,
  items
}: {
  selectedCity: CityDocument | null;
  items: CartItemDocument[];
}): CartItemDocument[] => {
  // console.log({ items });

  const validDateCartItems = items.filter(
    ({ delivery }) => !isDateExpired(delivery?.date || "")
  );

  // console.log({ validDateCartItems });

  const validUniqueCartItems = items.filter(
    ({ content }, index) =>
      validDateCartItems.indexOf(
        validDateCartItems.find(
          ({ content: content2 }) =>
            (content as ContentDocument)._id ===
            (content2 as ContentDocument)._id
        ) as CartItemDocument
      ) === index
  );

  // console.log({ validUniqueCartItems });

  const priceUpdatedItems = [...validUniqueCartItems].map((item) => {
    const updatedItem = { ...item };
    const content = item.content as ContentDocument;
    const customVariant = item.customVariant
      ? getCustomVariant({ content, variantId: item.customVariant })
      : null;
    const basePrice = customVariant
      ? customVariant.price.base.price
      : content.price!.base.price;
    const cityPrice = customVariant
      ? customVariant.price?.cities?.find(
          ({ city }) => city === selectedCity?._id
        )?.price
      : content.price?.cities?.find(({ city }) => city === selectedCity?._id)
          ?.price;

    updatedItem.pricePerUnit = cityPrice || basePrice;

    return updatedItem as CartItemDocument;
  });

  // console.log({ priceUpdatedItems });

  return priceUpdatedItems;
};
