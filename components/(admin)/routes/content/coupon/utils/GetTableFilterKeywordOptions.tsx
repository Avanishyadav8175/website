// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectCoupon } from "@/store/features/contents/couponSlice";
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CouponDocument>) => void;
}) {
  const dispatch = useDispatch();

  const { documents } = useSelector(selectCoupon.documentList);

  const contentCategoryStatus = useSelector(selectContentCategory.status);
  const { options: contentCategoryOptions } = useSelector(
    selectContentCategory.documentList
  );

  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocumentList());
    }
  }, [contentCategoryStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      type: [
        {
          label: "Discount",
          value: "discount"
        },
        {
          label: "Free Delivery",
          value: "free-delivery"
        }
      ],
      applicableCategories: (() => {
        const uniqueCategories = [
          ...Array.from(
            new Set(
              documents.flatMap(
                ({ applicableCategories }) => applicableCategories as string[]
              )
            )
          )
        ];

        return contentCategoryOptions.filter(({ value }) =>
          uniqueCategories.includes(value)
        );
      })(),
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, contentCategoryOptions, onReturnOptions]);

  return null;
}
