// hooks
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCouponAction,
  selectCoupon
} from "@/store/features/contents/couponSlice";

// types
import { type CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";
import { useEffect } from "react";

export default function OrderPriceData({
  paymentStatus,
  price,
  couponId
}: {
  paymentStatus: "completed" | "pending";
  price: CartPriceDocument;
  couponId?: string;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const couponStatus = useSelector(selectCoupon.status);

  const { documents: coupons } = useSelector(selectCoupon.documentList);

  // variables
  const coupon = coupons.find(({ _id }) => _id === couponId);

  // utils
  const getTotalAmount = ({
    price: {
      content,
      addon,
      customization,
      deliveryCharge,
      paymentPercentage,
      couponDiscount
    }
  }: {
    price: CartPriceDocument;
  }): number =>
    content + customization + addon + deliveryCharge - couponDiscount;

  const getPaidAmount = ({
    price: {
      content,
      addon,
      customization,
      deliveryCharge,
      paymentPercentage,
      couponDiscount
    }
  }: {
    price: CartPriceDocument;
  }): number =>
    paymentStatus === "completed"
      ? paymentPercentage !== 100
        ? Math.ceil(
            (content + (customization || 0)) * (paymentPercentage / 100) +
              addon +
              deliveryCharge
          )
        : content + customization + addon + deliveryCharge - couponDiscount
      : 0;

  const getPendingAmount = ({ price }: { price: CartPriceDocument }): number =>
    getTotalAmount({ price }) -
    (paymentStatus === "completed" ? getPaidAmount({ price }) : 0);

  // side effects
  useEffect(() => {
    if (couponStatus === "idle") {
      dispatch(createCouponAction.fetchDocumentList());
    }
  }, [couponStatus, dispatch]);

  return (
    <section className="flex flex-col p-5 bg-charcoal-3/20 rounded-lg w-[30%]">
      <span className="text-lg font-semibold underline">Price Details</span>
      <section className="flex flex-col">
        <span className="flex items-baseline justify-between gap-1 w-full">
          <span className="text-sm font-medium">{"Content:"}</span>
          <span>{price?.content || ""}</span>
        </span>
        {Boolean(price?.addon) && (
          <span className="flex items-baseline justify-between  gap-1">
            <span className="text-sm font-medium">{"Addon:"}</span>
            <span>{price?.addon || ""}</span>
          </span>
        )}
        {Boolean(price?.customization) && (
          <span className="flex items-baseline justify-between  gap-1">
            <span className="text-sm font-medium">{"Customization:"}</span>
            <span>{price?.customization || ""}</span>
          </span>
        )}
        <span className="flex items-baseline justify-between  gap-1">
          <span className="text-sm font-medium">{"Delivery Charge:"}</span>
          <span>{price?.deliveryCharge || ""}</span>
        </span>
        {Boolean(price?.couponDiscount) && (
          <span className="flex items-baseline justify-between  gap-1">
            <span className="text-sm font-medium">{"Coupon Discount:"}</span>
            <span className="flex items-baseline gap-1">
              {coupon && (
                <span className="text-xs font-light">{`(${coupon.code})`}</span>
              )}
              <span>{price?.couponDiscount || ""}</span>
            </span>
          </span>
        )}
        <div className="w-full h-px bg-black"></div>
        <span className="flex items-baseline justify-between  gap-1">
          <span className="text-sm font-medium">{"Total:"}</span>
          <span>{getTotalAmount({ price }) || ""}</span>
        </span>
        <span className="flex items-baseline justify-between  gap-1">
          <span className="text-sm font-medium">{"Paid:"}</span>
          <span className="flex items-baseline gap-1">
            {paymentStatus === "completed" && (
              <span className="text-xs font-light">{`(${price.paymentPercentage}%)`}</span>
            )}
            <span>{getPaidAmount({ price }) || "0"}</span>
          </span>
        </span>
        <span className="flex items-baseline justify-between  gap-1">
          <span className="text-sm font-medium">{"Pending:"}</span>
          <span>{getPendingAmount({ price }) || "0"}</span>
        </span>
      </section>
    </section>
  );
}
