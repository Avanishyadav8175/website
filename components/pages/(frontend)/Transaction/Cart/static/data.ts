import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CouponDiscountDocument } from "@/common/types/documentation/nestedDocuments/couponDiscount";
import { CouponValidityDocument } from "@/common/types/documentation/nestedDocuments/couponValidity";

export const DUMMY_AVAILABLE_COUPONS: CouponDocument[] = [
  {
    type: "free-delivery",
    code: "FREESHIP2024",
    description: "Free shipping on all orders.",
    minimumOrderAmount: 0,
    limitPerCustomer: 1,
    valid: {
      from: new Date("2024-08-01T00:00:00Z"),
      till: new Date("2024-09-30T23:59:59Z")
    } as CouponValidityDocument,
    discount: {
      type: "fixed",
      limit: 2300,
      percentage: 100
    } as CouponDiscountDocument,
    applicableCategories: ["Electronics", "Home Appliances"],
    _id: "mnq48t6y74syh"
  } as CouponDocument,
  {
    type: "discount",
    code: "SAVE20",
    description: "20% off on all items above 500 upto Rs.200.",
    minimumOrderAmount: 500,
    limitPerCustomer: 3,
    valid: {
      from: new Date("2024-08-01T00:00:00Z"),
      till: new Date("2024-09-30T23:59:59Z")
    } as CouponValidityDocument,
    discount: {
      type: "percentage",
      limit: 200,
      percentage: 20
    } as CouponDiscountDocument,
    applicableCategories: ["Clothing", "Books"],
    _id: "i8as6ger4q4y"
  } as CouponDocument,
  {
    type: "discount",
    code: "SAVE10",
    description: "Rs.10 off on orders over 100.",
    minimumOrderAmount: 100,
    limitPerCustomer: 5,
    valid: {
      from: new Date("2024-02-05T00:00:00Z"),
      till: new Date("2024-10-20T23:59:59Z")
    } as CouponValidityDocument,
    discount: {
      type: "fixed",
      limit: 10
    } as CouponDiscountDocument,
    applicableCategories: ["Furniture", "Sports"],
    _id: "hya98e7g673965ty"
  } as CouponDocument,
  {
    type: "discount",
    code: "MEGA45",
    description: "45% off on orders above 2000.",
    minimumOrderAmount: 2000,
    limitPerCustomer: 2,
    valid: {
      from: new Date("2024-08-01T00:00:00Z"),
      till: new Date("2024-10-31T23:59:59Z")
    } as CouponValidityDocument,
    discount: {
      type: "percentage",
      limit: 1000,
      percentage: 45
    } as CouponDiscountDocument,
    applicableCategories: ["Beauty", "Health"],
    _id: "ae8yg976gh69e"
  } as CouponDocument
];
