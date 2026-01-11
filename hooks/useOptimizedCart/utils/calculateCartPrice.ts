// types
import { type AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";

export const calculateCartPrice = ({
  items,
  paymentPercentage,
  coupon
}: {
  items: CartItemDocument[];
  paymentPercentage: number;
  coupon: CouponDocument | null;
}): CartPriceDocument => {
  const newMaxPaymentPercentage =
    items.reduce((max, { content }) => {
      const contentDoc = content as ContentDocument;

      return Math.max(
        (
          (contentDoc?.category?.primary as ContentCategoryDocument)?.charges
            ?.advancePayment as AdvancePaymentDocument
        )?.value || 100,
        max
      );
    }, 0) || 100;

  const content =
    items.reduce(
      (total, { pricePerUnit, quantity }) => total + pricePerUnit * quantity,
      0
    ) || 0;
  const addon =
    items.reduce(
      (total, { addons }) =>
        total +
        addons!.reduce(
          (itemAddonTotal, { pricePerUnit, quantity }) =>
            itemAddonTotal + pricePerUnit * quantity,
          0
        ),
      0
    ) || 0;
  const customization = items.reduce(
    (total, { customization }) =>
      total +
      (customization?.enhancement?.items?.reduce(
        (enhancementTotal, { price }) => enhancementTotal + price,
        0
      ) || 0) +
      (customization?.upgrade?.price || 0) +
      (customization?.flavour?.price || 0),
    0
  );
  const deliveryCharge = items.reduce(
    (max, { content, delivery: { type } }) => {
      const contentDoc = content as ContentDocument;
      const price =
        contentDoc.availability!.availableAt === "all-india"
          ? contentDoc.delivery!.charge!
          : (type as DeliveryTypeDocument).price;

      return Math.max(
        contentDoc.availability?.availableAt === "all-india"
          ? (contentDoc.delivery!.charge as number)
          : price,
        max
      );
    },
    0
  );

  const isCouponApplicable =
    coupon && coupon.minimumOrderAmount <= content + customization;

  const couponDiscount = isCouponApplicable
    ? (() => {
        if (coupon.type === "free-delivery") {
          return deliveryCharge;
        } else {
          if (coupon.discount!.type === "fixed") {
            return coupon.discount!.limit;
          } else {
            return Math.min(
              Math.ceil(
                (content + customization) * (coupon.discount!.percentage! / 100)
              ),
              coupon.discount!.limit
            );
          }
        }
      })()
    : 0;

  // console.log({ couponDiscount });

  const total =
    content + addon + customization + deliveryCharge - couponDiscount;

  const payable =
    paymentPercentage !== newMaxPaymentPercentage || paymentPercentage === 100
      ? total
      : Math.ceil((content + customization) * (paymentPercentage / 100)) +
        addon +
        deliveryCharge;
  const due = total - payable;

  return {
    content,
    addon,
    customization,
    deliveryCharge,
    total,
    paymentPercentage:
      paymentPercentage === newMaxPaymentPercentage
        ? newMaxPaymentPercentage
        : 100,
    couponDiscount,
    payable,
    due
  } as CartPriceDocument;
};
