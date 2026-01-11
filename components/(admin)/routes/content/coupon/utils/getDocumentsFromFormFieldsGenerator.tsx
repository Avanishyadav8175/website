import { CouponDiscountDocument } from "@/common/types/documentation/nestedDocuments/couponDiscount";
import { CouponValidityDocument } from "@/common/types/documentation/nestedDocuments/couponValidity";

interface FormFields extends HTMLFormControlsCollection {
  couponType: HTMLSelectElement;
  code: HTMLInputElement;
  description: HTMLTextAreaElement;
  minimumOrderAmount: HTMLInputElement;
  limitPerCustomer: HTMLInputElement;
  validFrom: HTMLSelectElement;
  validTill: HTMLInputElement;
  discountType: HTMLSelectElement;
  discountLimit: HTMLInputElement;
  discountPercentage: HTMLInputElement;
  applicableCategories: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  type: elements.couponType.value as "discount" | "free-delivery",
  code: elements.code.value,
  description: elements.description.value,
  minimumOrderAmount: Number(elements.minimumOrderAmount.value),
  limitPerCustomer: Number(elements.limitPerCustomer.value),
  valid: {
    from: elements.validFrom.value,
    till: elements.validTill.value
  } as CouponValidityDocument,
  ...(elements.couponType.value === "discount"
    ? {
        discount: {
          type: elements.discountType.value as "fixed" | "percentage",
          limit: Number(elements.discountLimit.value),
          ...(elements.discountType.value === "percentage"
            ? { percentage: Number(elements.discountPercentage.value) }
            : {})
        } as CouponDiscountDocument
      }
    : {}),
  ...(elements.applicableCategories.value
    ? {
        applicableCategories: JSON.parse(
          elements.applicableCategories.value
        ) as string[]
      }
    : {}),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
