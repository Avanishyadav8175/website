// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCartAction,
  selectCart
} from "@/store/features/dynamic/cartSlice";
import {
  createOrderAction,
  selectOrder
} from "@/store/features/dynamic/orderSlice";

export default function CancelledOrderCount() {
  // hooks
  const dispatch = useDispatch();

  const orderStatus = useSelector(selectOrder.status);
  const { documents: orders } = useSelector(selectOrder.documentList);

  const cartStatus = useSelector(selectCart.status);

  const { documents: carts } = useSelector((state) =>
    selectCart.documentList(state, {
      defaultFilterBy: "isOrdered",
      defaultFilterKeyword: "true",
      sortBy: "updatedAt",
      orderBy: "desc"
    })
  );

  // variables
  const count = orders
    .filter(({ payment }) => payment.status === "completed")
    .reduce((total, { cart: cartId }) => {
      const cart = carts.find(({ _id }) => _id === cartId);

      return (
        total +
        (cart?.items?.filter(({ status }) => status === "cancelled")?.length ||
          0)
      );
    }, 0);

  // side effects
  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(createOrderAction.fetchDocumentList());
    }
  }, [orderStatus, dispatch]);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(createCartAction.fetchDocumentList());
    }
  }, [cartStatus, dispatch]);

  return (
    <span className="bg-teal-600 scale-90 text-white flex items-center justify-center px-1.5 py-0.5 font-medium rounded-md !text-xs">
      {count}
    </span>
  );
}
