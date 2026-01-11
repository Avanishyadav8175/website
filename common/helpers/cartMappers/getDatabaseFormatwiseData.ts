import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CartDocument } from "@/common/types/documentation/dynamic/cart";
import { CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { VenueDocument } from "@/common/types/documentation/presets/venue";
import { updateMasterCartPrices } from "./manageCartContext";

type AnyObject = Record<string, any>;

export function removeLocalIds(obj: AnyObject): AnyObject {
  // Create a new object to hold the modified properties
  const result: AnyObject = {};

  for (const key in obj) {
    if (key === "_id" && obj[key].length === 20) {
      // Skip this key if it's "_id"
      continue;
    }

    const value = obj[key];

    // Recursively process nested objects or arrays
    if (typeof value === "object" && value !== null) {
      result[key] = Array.isArray(value)
        ? value.map(removeLocalIds)
        : removeLocalIds(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function excludePartialCheckout(cartDoc: CartDocument): CartDocument {
  const checkout = cartDoc.checkout;
  if (
    checkout &&
    checkout.name &&
    checkout.name.length &&
    checkout.location.address &&
    checkout.location.address.length &&
    checkout.location.pincode &&
    checkout.location.pincode.length &&
    checkout.contact.mail &&
    checkout.contact.mail.length &&
    checkout.contact.mobileNumber &&
    checkout.contact.mobileNumber.length
  )
    return cartDoc;

  let duplicated = cartDoc;
  delete duplicated["checkout"];

  return duplicated;
}

export function getDatabaseReadyCartDocument(cart: CartDocument): CartDocument {
  let readyCart = cart;

  // items
  let updatedItems = cart.items.map((item) => {
    let updatedItem = {
      ...item,
      content: (item.content as ContentDocument)._id as string,
      delivery: {
        ...item.delivery,
        type: (item.delivery.type as DeliveryTypeDocument)._id as string,
        slot:
          typeof item.delivery.slot === "string"
            ? item.delivery.slot
            : ((item.delivery.slot as TimeSlotDocument)._id as string),
        date: item.delivery.date
      }
    } as CartItemDocument;

    const updatedAddons = item.addons
      ? item.addons.map(
          (adn) =>
            ({
              ...adn,
              addon: (adn.addon as AddonDocument)._id as string
            }) as CartItemAddonDocument
        )
      : undefined;

    const updatedCustomization = item.customization
      ? ({
          ...item.customization,
          flavour: item.customization.flavour
            ? {
                ...item.customization.flavour,
                flavour: (item.customization.flavour.flavour as FlavourDocument)
                  ._id as string
              }
            : undefined,
          upgrade: item.customization.upgrade
            ? {
                ...item.customization.upgrade,
                flavour: (item.customization.upgrade.upgrade as UpgradeDocument)
                  ._id as string
              }
            : undefined,
          uploadedImage: item.customization.uploadedImage
            ? {
                ...item.customization.uploadedImage,
                images: (
                  item.customization.uploadedImage
                    .images as CustomizationImageDocument[]
                ).map(({ _id }) => _id as string)
              }
            : undefined,
          enhancement: item.customization.enhancement
            ? {
                ...item.customization.enhancement,
                items: item.customization.enhancement.items.map(
                  ({ price, enhancement }) => ({
                    price,
                    enhancement: (enhancement as EnhancementDocument)
                      ._id as string
                  })
                )
              }
            : undefined
        } as CartItemCustomizationDocument)
      : undefined;

    if (updatedAddons)
      updatedItem = {
        ...updatedItem,
        addons: updatedAddons
      } as CartItemDocument;

    if (updatedCustomization)
      updatedItem = {
        ...updatedItem,
        customization: updatedCustomization
      } as CartItemDocument;

    return updatedItem;
  });

  // coupon
  let updatedCoupon = cart.coupon
    ? ((cart.coupon as CouponDocument)._id as string)
    : undefined;

  // checkout
  let updatedCheckout = cart.checkout
    ? ({
        ...cart.checkout,
        occasion: cart.checkout.occasion
          ? ((cart.checkout.occasion as OccasionDocument)._id as string)
          : undefined,
        venue: cart.checkout.venue
          ? ((cart.checkout.venue as VenueDocument)._id as string)
          : undefined
      } as CartCheckoutDocument)
    : undefined;

  return {
    ...readyCart,
    coupon: updatedCoupon,
    items: updatedItems,
    checkout: updatedCheckout
  } as CartDocument;
}

export const updateCartPrices = (cart: CartDocument): CartDocument => {
  const updatedPrices = updateMasterCartPrices({ cart });
  if (updatedPrices) return { ...cart, price: updatedPrices } as CartDocument;
  return cart;
};
