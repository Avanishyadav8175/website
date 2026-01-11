/* 
For reference, read @/hooks/useCart -> POINTS TO READ FOR THIS CONTEXT
*/
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CartDocument } from "@/common/types/documentation/dynamic/cart";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { CityDocument } from "@/common/types/documentation/presets/city";
import { CartItemChoiceType } from "@/components/(frontend)/transaction/cart/static/types";
import {
  CartItemType,
  DeliveryDetailsType,
  TransactionPriceSummaryType
} from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import {
  getCityWiseContentPrices,
  getCityWisePrices
} from "../getCityWiseContentPrices";
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { ContentClassificationDocument } from "@/common/types/documentation/nestedDocuments/contentClassification";
import { CategoryChargesDocument } from "@/common/types/documentation/nestedDocuments/categoryCharges";
import { AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

const wholeInteger = (num: number) => Math.max(num || 0, 0);

export const extractCartItems = ({
  cart,
  selectedCity
}: {
  cart: CartDocument;
  selectedCity: CityDocument | null;
}): CartItemType[] => {
  const items = cart.items
    .filter((x) => x !== undefined)
    .filter(({ status }) => status === "new");

  if (items.length == 0) return [];

  const cartItems: CartItemType[] = items.map(
    ({
      _id,
      content: ct,
      customization,
      delivery,
      customVariant,
      titleIfCustomVariant
    }) => {
      const content = ct as ContentDocument;
      const img = content.media.primary as ImageDocument;

      const variantPriceDocument =
        customVariant && customVariant.length > 0
          ? content.variants &&
            content.variants.filter(({ type }) => type === "custom").length > 0
            ? content.variants
                .filter(({ type }) => type === "custom")
                .map(({ custom }) =>
                  custom
                    ? custom.variants.map(({ _id, price }) => ({
                        _id: _id as string,
                        price
                      }))
                    : undefined
                )
                .filter((x) => x !== undefined)
                .reduce((arr, val) => (arr = [...arr, ...val]), [])
                .find(({ _id }) => _id === customVariant)
            : undefined
          : undefined;

      const { price, mrp } =
        variantPriceDocument === undefined
          ? content.price
            ? getCityWiseContentPrices({ city: selectedCity, content })
            : { mrp: 0, price: 0 }
          : getCityWisePrices({
              city: selectedCity,
              prices: variantPriceDocument.price
            });

      return {
        _id: _id as string,
        contentId: content._id as string,
        addons:
          content.addons && content.addons.length
            ? content.addons
                .slice()
                .sort(
                  (a: ContentAddonDocument, b: ContentAddonDocument) =>
                    (a.isPopular ? -1 : 0) - (b.isPopular ? -1 : 0)
                )
                .map(({ addon: ad }) => {
                  const addon = ad as AddonDocument;
                  const image = addon.image as ImageDocument;
                  return {
                    _id: addon._id as string,
                    image: {
                      alt: image.alt || image.defaultAlt,
                      url: image.url
                    },
                    name: addon.name,
                    pricePerUnit: addon.price
                  };
                })
            : [],
        image: { alt: img.alt || img.defaultAlt, url: img.url },
        mrp,
        name:
          customVariant && customVariant.length > 0
            ? titleIfCustomVariant || ""
            : content.name,
        pricePerUnit: price,
        customizations: {
          data: customization,
          count: customization
            ? (customization.enhancement
                ? customization.enhancement.items.length
                : 0) +
              (customization.flavour ? 1 : 0) +
              (customization.upgrade ? 1 : 0) +
              (customization.balloonColor ? 1 : 0)
            : 0
        },
        deliveryDocument: content.delivery,
        date: delivery.date,
        time: delivery.slot as TimeSlotDocument,
        link: `${content.type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${content.slug}`,
        deliveryType:
          content.delivery &&
          content.delivery.slots &&
          content.delivery.slots.length > 1 &&
          delivery.type
            ? (delivery.type as DeliveryTypeDocument).name
            : null,
        edibleType:
          content.edible && content.edible.isEdible && content.edible.type
            ? content.edible.type
            : "non-edible"
      } as CartItemType;
    }
  );

  return cartItems;
};

export const extractCartDetails = (
  cart: CartDocument
): CartItemChoiceType[] => {
  const items = cart.items
    .filter((x) => x !== undefined)
    .filter(({ status }) => status === "new");

  if (items.length == 0) return [];

  const itemChoices: CartItemChoiceType[] = items.map(
    ({ _id, quantity, instruction, addons, customization }) => ({
      _id: _id as string,
      count: wholeInteger(quantity),
      instruction: instruction || "",
      addons:
        addons && addons.filter((x) => x !== undefined).length > 0
          ? addons
              .filter((x) => x !== undefined)
              .map(({ addon: ad, pricePerUnit, quantity }) => {
                const addon = ad as AddonDocument;
                const image = addon.image as ImageDocument;
                return {
                  _id: addon._id as string,
                  image: { alt: image.alt || image.defaultAlt, url: image.url },
                  name: addon.name,
                  pricePerUnit: wholeInteger(pricePerUnit),
                  count: wholeInteger(quantity)
                };
              })
          : []
    })
  );

  return itemChoices;
};

export const extractPrice = (
  cart: CartDocument
): TransactionPriceSummaryType => {
  const {
    content,
    addon,
    customization,
    deliveryCharge,
    paymentPercentage,
    couponDiscount
  } = cart.price;

  return {
    addon: wholeInteger(addon),
    base: Math.max(0, (customization || 0) + (content || 0)),
    coupon: wholeInteger(couponDiscount),
    paymentPercentage: wholeInteger(paymentPercentage),
    platform: wholeInteger(deliveryCharge)
  };
};

export const extractDeliveryDetails = (
  cart: CartDocument
): DeliveryDetailsType => {
  if (cart.checkout) {
    const {
      name,
      contact,
      location: { address, landmark, city, pincode },
      occasion,
      venue,
      deliverToSomeoneElse,
      receiverName,
      receiverMobileNumber
    } = cart.checkout;

    if (deliverToSomeoneElse) {
      return {
        type: "gift",
        name,
        address,
        pincode,
        mobile: contact?.mobileNumber || "",
        email: contact?.mail || "",
        city:
          typeof city === "string" ? city : (city as CityDocument).name || "",
        occasion: "",
        receiverName: receiverName || "",
        receiverMobile: receiverMobileNumber || ""
      };
    }

    return {
      address,
      city: typeof city === "string" ? city : (city as CityDocument).name || "",
      mobile: contact?.mobileNumber || "",
      email: contact?.mail || "",
      name,
      occasion: "",
      pincode,
      type: "default"
    };
  } else
    return {
      address: "",
      city: "",
      email: "",
      mobile: "",
      occasion: "",
      pincode: "",
      type: "default",
      name: ""
    };
};

export const extractAppliedCoupon = (
  cart: CartDocument
): CouponDocument | null => {
  const coupon = cart.coupon;
  if (coupon === undefined || typeof coupon === "string") return null;
  return coupon as CouponDocument;
};

export const filterRelevantCoupons = ({
  allCoupons,
  itemsInCart
}: {
  allCoupons: CouponDocument[];
  itemsInCart: CartItemDocument[];
}): CouponDocument[] => {
  const applicableCategories = itemsInCart
    .map(({ content }) => {
      const thisContentCategories = (content as ContentDocument).category;
      const primaryId =
        typeof thisContentCategories.primary === "string"
          ? thisContentCategories.primary
          : ((thisContentCategories.primary as ContentCategoryDocument)
              ._id as string);
      const relatedIds = thisContentCategories.related.map((related) =>
        typeof related === "string"
          ? related
          : ((related as ContentCategoryDocument)._id as string)
      );

      return [primaryId, ...relatedIds];
    })
    .reduce((arr, val) => (arr = [...arr, ...val]), []);

  const store = new Set<string>();
  applicableCategories.forEach((id) => store.add(id));

  const applicableCoupons = allCoupons.filter(({ applicableCategories }) => {
    for (let i = 0; i < applicableCategories.length; i += 1)
      if (store.has(applicableCategories[i] as string)) return true;

    return applicableCategories.length === 0 ? true : false;
  });

  return applicableCoupons;
};

export const getPartialPercentage = (items: CartItemDocument[]): number => {
  const partialPercentage = items
    .map(
      ({ content }) =>
        (
          (
            (
              (
                (content as ContentDocument)
                  .category as ContentClassificationDocument
              )?.primary as ContentCategoryDocument
            )?.charges as CategoryChargesDocument
          )?.advancePayment as AdvancePaymentDocument
        )?.value || 0
    )
    .reduce((ans, val) => (ans = Math.max(ans, val)), 0);

  return partialPercentage || 100;
};
