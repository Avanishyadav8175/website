// utils
import { checkIsSameDate } from "../utils/checkIsSameDate";

// hooks
import { useMemo } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectCart } from "@/store/features/dynamic/cartSlice";
import { selectContent } from "@/store/features/contents/contentSlice";
import { selectOrder } from "@/store/features/dynamic/orderSlice";

// components
import Booking from "./Booking";

export default function Bookings({ selectedDate }: { selectedDate: Date }) {
  // redux states
  const { documents: orders } = useSelector((state) =>
    selectOrder.documentList(state, {
      defaultFilterBy: "payment.status",
      defaultFilterKeyword: "completed",
      sortBy: "createdAt",
      orderBy: "asc"
    })
  );
  const { documents: carts } = useSelector(selectCart.documentList);
  const { documents: contents } = useSelector(selectContent.documentList);

  // memoized
  const cartItems = useMemo(
    () =>
      orders.flatMap(
        ({ _id: orderId, cart: cartId, createdAt: orderCreatedAt }) => {
          const cart = carts.find(({ _id }) => _id === cartId);

          return (
            cart?.items
              ?.filter(
                ({ status, content: contentId, delivery }) =>
                  status !== "cancelled" &&
                  (contents.find(({ _id }) => _id === contentId)?.availability
                    ?.availableAt === "all-india"
                    ? checkIsSameDate({
                        firstDate: selectedDate,
                        secondDate: new Date(orderCreatedAt)
                      })
                    : checkIsSameDate({
                        firstDate: selectedDate,
                        secondDate: new Date(delivery.date)
                      }))
              )
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              ?.map((cartItem) => ({
                orderId: orderId as string,
                cartItem
              })) || []
          );
        }
      ),
    [orders, carts, contents, selectedDate]
  );

  return (
    <section className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
      <section className="grid grid-cols-[1fr_5fr_3fr_1fr] w-full px-3 sm:px-4 py-1 rounded-lg sm:text-lg bg-[#ebebeb] text-charcoal-3/70 text-center">
        <span className="line-clamp-1">Sr&nbsp;No</span>
        <span>Content</span>
        <span>Slot</span>
        <span className="line-clamp-1">Details</span>
      </section>
      <section className="w-full h-[35dvh] sm:h-[85dvh] pb-[5dvh] sm:pb-0 overflow-y-scroll sm:overflow-y-auto scrollbar-hide">
        <section className="flex flex-col items-center justify-center gap-2 w-full">
          {cartItems.map(({ orderId, cartItem }, i) => (
            <Booking
              key={cartItem._id as string}
              srNo={i + 1}
              orderId={orderId}
              cartItem={cartItem}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
