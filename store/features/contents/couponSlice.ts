// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

const slice = getSlice<CouponDocument>({
  sliceName: "coupons",
  documentName: "coupon",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Coupon Type",
            value: "type"
          },
          {
            label: "Category",
            value: "applicableCategories"
          },
          {
            label: "Created By",
            value: "createdBy"
          },
          {
            label: "Updated By",
            value: "updatedBy"
          }
        ],
        sort: [
          {
            label: "Code",
            value: "code"
          },
          {
            label: "Created At",
            value: "createdAt"
          },
          {
            label: "UpdatedAt",
            value: "updatedAt"
          }
        ]
      },
      default: {
        filter: "",
        sort: "createdAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/content/coupon",
  selectKeys: [
    "code",
    "type",
    "valid",
    "minimumOrderAmount",
    "discount",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["code", "description"],
  optionLabelKey: "code"
});

export const couponReducer = slice.reducer;
export const createCouponAction = slice.createAction;
export const selectCoupon = slice.select;
