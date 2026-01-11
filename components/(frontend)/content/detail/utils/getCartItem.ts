// libraries
// Removed mongoose import to prevent client-side build errors

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";

// Client-safe ObjectId generation
const generateObjectId = (): string => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomBytes = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('').substring(0, 16);
  return timestamp + randomBytes;
};

export const getCartItem = ({
  content,
  customVariant,
  titleIfCustomVariant,
  pricePerUnit,
  delivery,
  customization,
  addons
}: {
  content: ContentDocument;
  customVariant?: string;
  titleIfCustomVariant?: string;
  pricePerUnit: number;
  delivery: CartItemDeliveryDocument;
  customization: CartItemCustomizationDocument;
  addons: CartItemAddonDocument[];
}) =>
  ({
    _id: generateObjectId() as any,
    status: "new",
    content,
    customVariant,
    titleIfCustomVariant,
    pricePerUnit,
    quantity: 1,
    delivery,
    customization,
    addons
  }) as CartItemDocument;
