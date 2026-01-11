// icons
import { Truck } from "lucide-react";

// hooks
import { useMemo } from "react";

// components
import CustomerOrder from "./CustomerOrder";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type OrderFilter } from "../types/filter";

export default function CustomerOrderList({
  orders,
  filter
}: {
  orders: OrderDocument[];
  filter: OrderFilter;
}) {
  // variables
  const filteredOrders = useMemo(() => {
    if (orders?.length) {
      switch (filter) {
        case "All":
          return (
            orders?.map(
              (order) =>
                ({
                  ...order,
                  cart: {
                    ...(order.cart as CartDocument),
                    items: [...(order.cart as CartDocument).items]
                  }
                }) as OrderDocument
            ) || []
          );

        case "Upcoming":
          return orders
            ?.filter((order) =>
              (order.cart as CartDocument).items.some(
                ({ status }) => status !== "completed" && status !== "cancelled"
              )
            )
            ?.map(
              (order) =>
                ({
                  ...order,
                  cart: {
                    ...(order.cart as CartDocument),
                    items: (order.cart as CartDocument).items.filter(
                      ({ status }) =>
                        status !== "completed" && status !== "cancelled"
                    )
                  }
                }) as OrderDocument
            );

        case "Delivered":
          return orders
            ?.filter((order) =>
              (order.cart as CartDocument).items.some(
                ({ status }) => status === "completed"
              )
            )
            ?.map(
              (order) =>
                ({
                  ...order,
                  cart: {
                    ...(order.cart as CartDocument),
                    items: (order.cart as CartDocument).items.filter(
                      ({ status }) => status === "completed"
                    )
                  }
                }) as OrderDocument
            );

        case "Failed":
          return orders.filter(
            ({ payment: { status } }) => status === "pending"
          );

        default:
          return [];
      }
    }

    return [];
  }, [orders, filter]);

  return (
    <section className="grid grid-cols-1 overflow-y-scroll justify-start auto-rows-min scrollbar-hide gap-3 pt-2 h-device max-h-device max-lg:px-2">
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, i) => (
          <CustomerOrder
            key={i}
            order={order}
          />
        ))
      ) : (
        <div className="text-[#767676] flex flex-col justify-start items-center py-20">
          <Truck
            strokeWidth={1.5}
            height={32}
            width={32}
          />
          <span>No orders made</span>
        </div>
      )}
    </section>
  );
}
