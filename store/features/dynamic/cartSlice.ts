// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";

const slice = getSlice<CartDocument>({
  sliceName: "carts",
  documentName: "cart",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [],
        sort: [
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
  apiRoute: "/api/admin/dynamic/cart",
  selectKeys: [
    "isOrdered",
    "customer",
    "items",
    "checkout",
    "coupon",
    "price",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "isOrdered"
});

export const cartReducer = slice.reducer;
export const createCartAction = slice.createAction;
export const selectCart = slice.select;
