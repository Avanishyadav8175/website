// hooks
import { useEffect, useState } from "react";
import { useDispatch } from "@/store/withType";

// redux
import { createCartAction } from "@/store/features/dynamic/cartSlice";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { type OrderStatus } from "./types/type";

export default function OrderStatus({
  cartId,
  cartItems,
  cartItemId,
  status,
  isDisabled
}: {
  cartId: string;
  cartItems: CartItemDocument[];
  cartItemId: string;
  status: OrderStatus;
  isDisabled: boolean;
}) {
  // hooks
  const dispatch = useDispatch();

  // status
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(status);

  // side effects
  useEffect(() => {
    setOrderStatus(status);
  }, [status, cartItemId]);

  return (
    <Input
      className="min-w-[150px]"
      type="dropdown"
      name="status"
      isRequired={false}
      isDisabled={isDisabled}
      errorCheck={false}
      validCheck={false}
      nullOption={false}
      options={[
        { label: "New", value: "new" },
        // { label: "Preparing", value: "preparing" },
        { label: "Running", value: "on-the-way" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" }
      ]}
      customValue={{
        value: orderStatus,
        setValue: (newStatus) => {
          dispatch(
            createCartAction.updateDocument({
              documentId: cartId,
              updateData: {
                items: [...cartItems].map((cartItem) => {
                  if (cartItem._id === cartItemId) {
                    const updatedCartItem = { ...cartItem };

                    updatedCartItem.status = newStatus as OrderStatus;

                    return updatedCartItem;
                  }

                  return cartItem;
                }) as CartItemDocument[]
              }
            })
          );

          setOrderStatus(newStatus as OrderStatus);
        }
      }}
    />
  );
}
