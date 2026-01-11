// redux
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import moment from "moment";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CouponDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const contentCategoryStatus = useSelector(selectContentCategory.status);

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [couponType, setCouponType] = useState<"discount" | "free-delivery">(
    initialDocument?.type || "discount"
  );
  const [discountType, setDiscountType] = useState<"fixed" | "percentage">(
    initialDocument?.discount?.type || "fixed"
  );

  // effects
  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocuments());
    }
  }, [contentCategoryStatus, dispatch]);

  useEffect(() => {
    if (initialDocument) {
      setCouponType(initialDocument?.type || "discount");
    }
  }, [initialDocument]);

  return (
    <section className="grid max-w-[60dvw] grid-cols-1 gap-4 max-h-[calc(100dvh_-_200px)] pb-20 overflow-y-scroll scrollbar-hide">
      <Input
        type="dropdown"
        name="couponType"
        isRequired
        labelConfig={{
          label: "Type",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        customValue={{
          value: couponType,
          setValue: (newCouponValue) => {
            setCouponType(newCouponValue as "discount" | "free-delivery");
          }
        }}
        options={[
          {
            label: "Discount",
            value: "discount"
          },
          {
            label: "Free Delivery",
            value: "free-delivery"
          }
        ]}
      />
      <Input
        type="text"
        name="code"
        isRequired
        labelConfig={{
          label: "Code",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.code || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Textarea
        name="description"
        isRequired
        labelConfig={{
          label: "Description",
          labelStyle: "",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.description || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="minimumOrderAmount"
        isRequired
        labelConfig={{
          label: "Minimum Order Amount"
        }}
        defaultValue={initialDocument?.minimumOrderAmount?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="limitPerCustomer"
        isRequired
        labelConfig={{
          label: "Limit Per Customer"
        }}
        defaultValue={initialDocument?.limitPerCustomer?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="date"
        name="validFrom"
        isRequired
        labelConfig={{
          label: "Valid From"
        }}
        defaultValue={
          initialDocument?.valid?.from
            ? moment(initialDocument?.valid?.from as string).format(
                "YYYY-MM-DD"
              )
            : ""
        }
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="date"
        name="validTill"
        isRequired
        labelConfig={{
          label: "Valid Till"
        }}
        defaultValue={
          initialDocument?.valid?.till
            ? moment(initialDocument?.valid?.till as string).format(
                "YYYY-MM-DD"
              )
            : ""
        }
        errorCheck={false}
        validCheck={false}
      />
      {couponType === "discount" && (
        <>
          <Input
            type="dropdown"
            name="discountType"
            isRequired={couponType === "discount"}
            labelConfig={{
              label: "Discount Type",
              layoutStyle: ""
            }}
            errorCheck={false}
            validCheck={false}
            nullOption={false}
            customValue={{
              value: discountType,
              setValue: (newDiscountType) => {
                setDiscountType(newDiscountType as "fixed" | "percentage");
              }
            }}
            options={[
              {
                label: "Fixed",
                value: "fixed"
              },
              {
                label: "Percentage",
                value: "percentage"
              }
            ]}
          />
          <Input
            type="number"
            name="discountLimit"
            isRequired={couponType === "discount"}
            labelConfig={{
              label: "Discount Limit",
              layoutStyle: ""
            }}
            defaultValue={initialDocument?.discount?.limit?.toString() || ""}
            errorCheck={false}
            validCheck={false}
          />
          {discountType === "percentage" && (
            <Input
              type="number"
              name="discountPercentage"
              isRequired={
                couponType === "discount" && discountType === "percentage"
              }
              labelConfig={{
                label: "Discount Percentage",
                layoutStyle: ""
              }}
              defaultValue={
                initialDocument?.discount?.percentage?.toString() || ""
              }
              errorCheck={false}
              validCheck={false}
            />
          )}
        </>
      )}
      <AdvancedCheckbox
        name="applicableCategories"
        label="Applicable Categories"
        searchPlaceholder="Search Applicable Category"
        layoutStyle="space-y-2 mt-2"
        options={contentCategoryOptions}
        defaultSelected={initialDocument?.applicableCategories as string[]}
      />
    </section>
  );
}
