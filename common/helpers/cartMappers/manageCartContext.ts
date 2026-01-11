import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CartDocument } from "@/common/types/documentation/dynamic/cart";
import { CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { CartCheckoutContactDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutContact";
import { CartCheckoutLocationDocument } from "@/common/types/documentation/nestedDocuments/cartCheckoutLocation";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { CouponDiscountDocument } from "@/common/types/documentation/nestedDocuments/couponDiscount";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { SetStateType } from "@/common/types/reactTypes";
import { CartItemChoiceType } from "@/components/(frontend)/transaction/cart/static/types";
import { CartItemType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import moment from "moment";
import { getPartialPercentage } from "./funnelDownToCart";

// HANDLE ADD TO CART ==================================================

export const handleAddNewItemToCart = ({
  cart,
  newItem,
  setCart
}: {
  cart: CartDocument;
  newItem: CartItemDocument;
  setCart: SetStateType<CartDocument>;
}) => {
  const existingItems = cart.items;
  const thisContentAlreadyInCart = existingItems.find(
    ({ content: ct, delivery, customVariant }) => {
      const content = ct as ContentDocument;
      const newContent = newItem.content as ContentDocument;

      // rule out different contents
      if ((content._id as string) !== newContent._id) return false;

      // rule out different dates
      if (!moment(delivery.date).isSame(moment(newItem.delivery.date)))
        return false;

      // rule out different custom variants
      if (
        customVariant &&
        customVariant.length > 0 &&
        newItem.customVariant &&
        newItem.customVariant.length > 0 &&
        customVariant !== newItem.customVariant
      )
        return false;

      // at this stage, dates and contents and variants are all same
      return true;
    }
  );

  if (thisContentAlreadyInCart) {
    // increase count by 1 and update its time slot
    setCart(
      (prev) =>
        ({
          ...prev,
          items: prev.items.map((item) =>
            ((item.content as ContentDocument)._id as string) ===
              (thisContentAlreadyInCart._id as string) &&
            item.customVariant === thisContentAlreadyInCart.customVariant
              ? ({
                  ...item,
                  quantity: item.quantity + 1,
                  delivery: newItem.delivery,
                  addons: newItem.addons,
                  customization: newItem.customization,
                  pricePerUnit: newItem.pricePerUnit
                } as CartItemDocument)
              : item
          )
        }) as CartDocument
    );
    return;
  }

  // newItem is a new item so push into cart
  setCart(
    (prev) =>
      ({
        ...prev,
        items: [newItem, ...prev.items]
      }) as CartDocument
  );
};

// HANDLE PRICE UPDATES ==================================================

export const updateMasterCartPrices = ({
  cart,
  setCart
}: {
  cart: CartDocument;
  setCart?: SetStateType<CartDocument>;
}) => {
  const isFullyPaying = cart.price.paymentPercentage === 100 ? true : false;

  const baseAmount = cart.items
    .map(({ pricePerUnit, quantity }) => pricePerUnit * quantity)
    .reduce((sum, val) => (sum += val), 0);

  const addonsAmount = cart.items
    .map(({ addons }) =>
      addons === undefined
        ? 0
        : addons
            .map(({ quantity, pricePerUnit }) => pricePerUnit * quantity)
            .reduce((sum, val) => (sum += val), 0)
    )
    .reduce((sum, val) => (sum += val), 0);

  const platformCharges = cart.items
    .map(({ delivery: { type } }) => (type as DeliveryTypeDocument).price)
    .reduce((max, val) => (max = Math.max(max, val)), 0);

  const customizationAmount = cart.items
    .map(({ customization }) =>
      customization === undefined
        ? 0
        : (customization.enhancement &&
          customization.enhancement.items &&
          customization.enhancement.items.length > 0
            ? customization.enhancement.items
                .map(({ price }) => price || 0)
                .reduce((sum, val) => (sum += val), 0)
            : 0) +
          (customization.upgrade && customization.upgrade.price
            ? customization.upgrade.price
            : 0) +
          (customization.flavour && customization.flavour.price
            ? customization.flavour.price
            : 0)
    )
    .reduce((sum, val) => (sum += val), 0);

  const totalAmountOperableOnCoupon =
    baseAmount + customizationAmount + addonsAmount;

  let couponDiscount: number;
  if (!isFullyPaying || cart.coupon === undefined) couponDiscount = 0;
  else {
    const coupon = cart.coupon as CouponDocument;
    if (coupon.minimumOrderAmount <= totalAmountOperableOnCoupon) {
      if (coupon.type == "free-delivery") couponDiscount = -platformCharges;
      else if (coupon.discount) {
        const discount = coupon.discount as CouponDiscountDocument;
        if (discount.type === "fixed")
          couponDiscount = Math.min(
            totalAmountOperableOnCoupon,
            discount.limit
          );
        else
          couponDiscount = Math.min(
            Math.ceil(
              ((discount.percentage || 100) * totalAmountOperableOnCoupon) / 100
            ),
            discount.limit,
            totalAmountOperableOnCoupon
          );
      } else couponDiscount = 0;
    } else couponDiscount = 0;
  }

  const updatedPrices: CartPriceDocument = {
    content: baseAmount,
    addon: addonsAmount,
    customization: customizationAmount,
    deliveryCharge: platformCharges,
    couponDiscount,
    paymentPercentage: cart.price.paymentPercentage || 100
  } as CartPriceDocument;

  if (setCart)
    setCart((prev) => ({ ...prev, price: updatedPrices }) as CartDocument);
  else return updatedPrices;
};

// HANDLE CART ITEM STATE UPDATES ==================================================

export const handleCartItemInteractionUpdates = ({
  cart,
  setCart,
  updatedItems,
  updatedItemChoices
}: {
  cart: CartDocument;
  setCart: SetStateType<CartDocument>;
  updatedItems: CartItemType[];
  updatedItemChoices: CartItemChoiceType[];
}) => {
  const contentChoiceIds = updatedItemChoices.map(({ _id }) => _id);
  const contentsToSave = updatedItems
    .map(({ _id }) => _id)
    .filter((id) => contentChoiceIds.includes(id));

  const updatedCart = {
    ...cart,
    items: (cart.items
      ? cart.items
          .filter(({ _id }) => contentsToSave.includes(_id as string))
          .map((item) => {
            const relevantItem = updatedItems.find(
              ({ _id }) => (_id as string) === (item._id as string)
            );
            const relevantItemChoice = updatedItemChoices.find(
              ({ _id }) => (_id as string) === (item._id as string)
            );
            const contentDocDeliverySlots = (item.content as ContentDocument)
              .delivery?.slots;
            const selectedItem = updatedItems
              .map(({ deliveryType, time, _id }) => ({
                time,
                deliveryType,
                _id
              }))
              .find(({ _id }) => (_id as string) === (item._id as string));

            const newDeliveryTypeId = selectedItem?.deliveryType;
            const newTimeSlotId = selectedItem
              ? (selectedItem.time._id as string)
              : null;

            if (relevantItem && relevantItemChoice) {
              const selectedAddonsIds = relevantItemChoice.addons
                ? relevantItemChoice.addons.map(({ _id }) => _id)
                : [""];
              const relevantAddons = (item.content as ContentDocument).addons
                ? (
                    (item.content as ContentDocument)
                      .addons as ContentAddonDocument[]
                  )
                    .filter(({ addon: ad }) =>
                      selectedAddonsIds.includes(
                        (ad as AddonDocument)._id as string
                      )
                    )
                    .map(({ addon }) => addon as AddonDocument)
                : [];

              let updatedTimeSlotDocument = relevantItem.time;
              let updatedDeliveryTypeDocument = (
                (
                  (item.content as ContentDocument)
                    .delivery as ContentDeliveryDocument
                ).slots as ContentDeliverySlotDocument[]
              ).find(({ _id }) => (_id as string) === newDeliveryTypeId)
                ?.type as DeliveryTypeDocument;

              if (
                newTimeSlotId &&
                newDeliveryTypeId &&
                newDeliveryTypeId.length === 24 &&
                contentDocDeliverySlots &&
                contentDocDeliverySlots.length > 0
              ) {
                const newDeliveryDocSlot = contentDocDeliverySlots.find(
                  ({ _id }) => (_id as string) === newDeliveryTypeId
                );

                updatedTimeSlotDocument =
                  (
                    newDeliveryDocSlot?.type as DeliveryTypeDocument
                  ).timeSlots.find(
                    ({ _id }) => (_id as string) === newTimeSlotId
                  ) || updatedTimeSlotDocument;
              }

              let deliveryData = {
                date: new Date(relevantItem.date).toISOString(),
                slot: updatedTimeSlotDocument
              };

              if (updatedDeliveryTypeDocument !== undefined)
                deliveryData = {
                  ...deliveryData,
                  // @ts-ignore
                  type: updatedDeliveryTypeDocument
                };

              const updatedItemDocument = {
                ...item,
                quantity: relevantItemChoice.count,
                instruction:
                  relevantItemChoice.instruction.length === 0
                    ? undefined
                    : relevantItemChoice.instruction,
                addons: relevantAddons.map(
                  (addon) =>
                    ({
                      addon,
                      pricePerUnit:
                        relevantItemChoice.addons.find(
                          ({ _id }) => _id === (addon._id as string)
                        )?.pricePerUnit || 0,
                      quantity: relevantItemChoice.addons.find(
                        ({ _id }) => _id === (addon._id as string)
                      )?.count
                    }) as CartItemAddonDocument
                ),
                delivery: {
                  ...item.delivery,
                  ...deliveryData
                }
              } as CartItemDocument;

              return updatedItemDocument;
            }

            return item;
          })
      : []) as CartItemDocument[]
  } as CartDocument;

  setCart((prev) => updatedCart);
};

// MERGE CART FROM LOCAL AND API ============================================
const getMergedCheckout = (
  local: CartCheckoutDocument | undefined,
  api: CartCheckoutDocument | undefined
): CartCheckoutDocument | undefined => {
  if (local === undefined) return api;
  if (api === undefined) return local;

  let merged = api;

  merged = {
    ...merged,
    name: local.name && local.name.length > 0 ? local.name : api.name,
    contact: {
      ...merged.contact,
      mobileNumber:
        local.contact.mobileNumber.length > 0
          ? local.contact.mobileNumber
          : api.contact.mobileNumber,
      mail:
        local.contact.mail.length > 0 ? local.contact.mail : api.contact.mail
    },
    location: {
      ...merged.location,
      address:
        local.location.address.length > 0
          ? local.location.address
          : api.location.address,
      city:
        local.location.city.length > 0
          ? local.location.city
          : api.location.city,
      pincode:
        local.location.pincode.length > 0
          ? local.location.pincode
          : api.location.pincode
    },
    deliverToSomeoneElse:
      local.deliverToSomeoneElse === undefined
        ? api.deliverToSomeoneElse || false
        : local.deliverToSomeoneElse
  } as CartCheckoutDocument;

  if (
    local.contact.alternateMobileNumber &&
    local.contact.alternateMobileNumber.length > 0
  )
    merged = {
      ...merged,
      contact: {
        ...merged.contact,
        alternateMobileNumber: local.contact.alternateMobileNumber
      } as CartCheckoutContactDocument
    } as CartCheckoutDocument;

  if (local.location.landmark && local.location.landmark.length > 0)
    merged = {
      ...merged,
      location: {
        ...merged.location,
        landmark: local.location.landmark
      } as CartCheckoutLocationDocument
    } as CartCheckoutDocument;

  if (local.note && local.note.length > 0)
    merged = {
      ...merged,
      note: local.note
    } as CartCheckoutDocument;

  if (local.occasion)
    merged = {
      ...merged,
      occasion: local.occasion
    } as CartCheckoutDocument;

  if (local.venue)
    merged = {
      ...merged,
      venue: local.venue
    } as CartCheckoutDocument;

  if (merged.deliverToSomeoneElse)
    merged = {
      ...merged,
      receiverName: local.receiverName || api.receiverName || "",
      receiverMobileNumber:
        local.receiverMobileNumber || api.receiverMobileNumber || ""
    } as CartCheckoutDocument;

  return merged;
};

const mergedCartItem = (
  local: CartItemDocument,
  api: CartItemDocument
): CartItemDocument => {
  // api will take preference
  let merged = api;

  merged = {
    ...merged,
    // present price takes preference as price may have updated
    pricePerUnit: local.pricePerUnit || merged.pricePerUnit,
    // present timeslot will take preference over api one
    delivery: {
      ...merged.delivery,
      slot:
        typeof local.delivery.slot === "string"
          ? (local.delivery.type as DeliveryTypeDocument).timeSlots.find(
              ({ _id }) => (_id as string) === local.delivery.slot
            ) || local.delivery.slot
          : local.delivery.slot
    }
  } as CartItemDocument;

  return merged;
};

const getMergedItems = (
  local: CartItemDocument[],
  api: CartItemDocument[]
): CartItemDocument[] => {
  if (
    (local === undefined || local.length === 0) &&
    (api === undefined || api.length === 0)
  )
    return [];

  // for api cart items, replace slot of delivery with relevant timeslot from its delivery.type
  const updatedApi = api.map(
    (item) =>
      ({
        ...item,
        delivery: item.delivery
          ? ({
              ...item.delivery,
              slot:
                typeof item.delivery.slot === "string"
                  ? (item.delivery.type as DeliveryTypeDocument).timeSlots.find(
                      ({ _id }) => (_id as string) === item.delivery.slot
                    )
                  : item.delivery.slot
            } as CartItemDeliveryDocument)
          : undefined
      }) as CartItemDocument
  );

  if (local === undefined || local.length === 0) return updatedApi;
  if (api === undefined || api.length === 0) return local;

  const localIds = local.map(({ content, delivery }) => ({
    contentId:
      typeof content === "string"
        ? content
        : ((content as ContentDocument)._id as string),
    date: new Date(delivery.date)
  }));

  const apiIds = api.map(({ content, delivery }) => ({
    contentId:
      typeof content === "string"
        ? content
        : ((content as ContentDocument)._id as string),
    date: new Date(delivery.date)
  }));

  const intersectingIds = localIds
    .filter(({ date, contentId }) =>
      apiIds.find(
        (api) => api.contentId === contentId && moment(api.date).isSame(date)
      )
    )
    .filter((x) => x !== undefined);

  let mergedItems = [];

  for (let i = 0; i < local.length; i += 1) {
    const isIntersecting = intersectingIds.find(
      ({ contentId, date }) =>
        contentId ===
          (typeof local[i].content === "string"
            ? local[i].content
            : ((local[i].content as ContentDocument)._id as string)) &&
        moment(date).isSame(local[i].delivery.date)
    );

    if (!isIntersecting) {
      mergedItems.push(local[i]);
    } else {
      mergedItems.push(
        mergedCartItem(
          local[i],
          api.find(
            ({ content, delivery }) =>
              moment(delivery.date).isSame(isIntersecting.date) &&
              (typeof content === "string"
                ? content === isIntersecting.contentId
                : isIntersecting.contentId ===
                  ((content as ContentDocument)._id as string))
          ) || ({} as CartItemDocument)
        )
      );
    }
  }

  for (let i = 0; i < updatedApi.length; i += 1) {
    const isIntersecting = intersectingIds.find(
      ({ contentId, date }) =>
        contentId ===
          (typeof updatedApi[i].content === "string"
            ? updatedApi[i].content
            : ((updatedApi[i].content as ContentDocument)._id as string)) &&
        moment(date).isSame(updatedApi[i].delivery.date)
    );

    if (!isIntersecting) {
      mergedItems.push(updatedApi[i]);
    }
  }

  return mergedItems;
};

export const mergeLocalAndAPICartData = ({
  local,
  fromAPI
}: {
  local: CartDocument;
  fromAPI: CartDocument;
}): [boolean, CartDocument] => {
  // console.table({ local, fromAPI });

  // Customer IDs don't match then don't merge
  if (
    (local.customer as string).length > 0 &&
    fromAPI.customer !== local.customer
  )
    return [false, {} as CartDocument];

  let mergedCheckout = getMergedCheckout(local.checkout, fromAPI.checkout);
  let mergedItems = getMergedItems(local.items, fromAPI.items);

  let mergedCart: CartDocument = {
    ...fromAPI,
    items: mergedItems,
    checkout: mergedCheckout
  } as CartDocument;

  // console.log({
  //   mergedCart,
  //   maxPercentage: getPartialPercentage(mergedCart.items)
  // });

  return [true, mergedCart];
};
