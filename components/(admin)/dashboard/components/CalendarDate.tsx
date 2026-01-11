// libraries
import moment from "moment";

// utils
import { checkIsSameDate } from "../utils/checkIsSameDate";
import { getDateGridPosition } from "../utils/getDateGridPosition";

// hooks
import { useMemo } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectCart } from "@/store/features/dynamic/cartSlice";
import { selectOrder } from "@/store/features/dynamic/orderSlice";
import { selectContent } from "@/store/features/contents/contentSlice";

export default function CalendarDate({
  date,
  selectedDate,
  onSelectDate
}: {
  date: Date;
  selectedDate: Date;
  onSelectDate: (selectedDate: Date) => void;
}) {
  // redux states
  const { documents: orders } = useSelector((state) =>
    selectOrder.documentList(state, {
      defaultFilterBy: "payment.status",
      defaultFilterKeyword: "completed"
    })
  );
  const { documents: carts } = useSelector(selectCart.documentList);
  const { documents: contents } = useSelector(selectContent.documentList);

  // variables
  const isToday = checkIsSameDate({
    firstDate: new Date(),
    secondDate: date
  });

  const isSelected = checkIsSameDate({
    firstDate: selectedDate,
    secondDate: date
  });

  // memoized
  const cartItems = useMemo(
    () =>
      orders.flatMap(({ cart: cartId, createdAt: orderCreatedAt }) => {
        const cart = carts.find(({ _id }) => _id === cartId);

        return (
          cart?.items?.filter(
            ({ status, content: contentId, delivery }) =>
              status !== "cancelled" &&
              (contents.find(({ _id }) => _id === contentId)?.availability
                ?.availableAt === "all-india"
                ? checkIsSameDate({
                    firstDate: date,
                    secondDate: new Date(orderCreatedAt)
                  })
                : checkIsSameDate({
                    firstDate: date,
                    secondDate: new Date(delivery.date)
                  }))
          ) || []
        );
      }),
    [orders, carts, contents, date]
  );

  const upcoming = useMemo(
    () =>
      cartItems.filter(
        ({ status, content: contentId }) =>
          contents.find(({ _id }) => _id === contentId)?.availability
            ?.availableAt !== "all-india" && status !== "completed"
      ).length,
    [contents, cartItems]
  );

  const completed = useMemo(
    () =>
      cartItems.filter(
        ({ status, content: contentId }) =>
          contents.find(({ _id }) => _id === contentId)?.availability
            ?.availableAt !== "all-india" && status === "completed"
      ).length,
    [contents, cartItems]
  );

  const allIndia = useMemo(
    () =>
      cartItems.filter(
        ({ content: contentId }) =>
          contents.find(({ _id }) => _id === contentId)?.availability
            ?.availableAt === "all-india"
      ).length,
    [contents, cartItems]
  );

  const total = useMemo(
    () => upcoming + completed + allIndia,
    [upcoming, completed, allIndia]
  );

  return (
    <div
      style={getDateGridPosition({ date })}
      className={`relative group flex flex-col items-center justify-end gap-0.5 sm:gap-2 aspect-square sm:shadow-lg sm:hover:shadow-xl ${isSelected ? "max-sm:bg-teal-200" : ""} transition-colors duration-200 max-sm:hover:bg-teal-200 rounded-lg cursor-pointer`}
      onClick={() => {
        onSelectDate(date);
      }}
    >
      {Boolean(total) && (
        <span className="sm:hidden absolute top-0.5 right-0.5 rounded-full text-[14px] text-blue-800">
          {total}
        </span>
      )}
      <span
        className={`flex-1 flex items-center justify-center text-md sm:text-3xl ${isToday ? "max-sm:font-semibold" : ""} sm:font-bold ${isSelected ? (isToday ? "text-teal-800" : "text-charcoal-3") : isToday ? "max-sm:text-teal-800 sm:text-teal-800" : "max-sm:text-charcoal-3/60 sm:text-charcoal-3/30"} transition-colors duration-200 ${isSelected ? "" : "group-hover:text-charcoal-3"}`}
      >
        <span>{moment(date).format("D")}</span>
      </span>
      <section className={`hidden sm:flex items-center justify-center`}>
        <div
          className={`w-8 px-2 py-1 font-semibold ${isSelected ? "bg-blue-200 text-blue-800" : "bg-blue-200/30 text-blue-800/30"} rounded-bl-lg transition-colors duration-200 group-hover:bg-blue-200 group-hover:text-blue-800`}
        >
          {upcoming}
        </div>
        <div
          className={`w-8 px-2 py-1 font-semibold ${isSelected ? "bg-purple-200 text-purple-800" : "bg-purple-200/30 text-purple-800/30"} transition-colors duration-200 group-hover:bg-purple-200 group-hover:text-purple-800`}
        >
          {allIndia}
        </div>
        <div
          className={`w-8 px-2 py-1 font-semibold ${isSelected ? "bg-green-200 text-green-800" : "bg-green-200/30 text-green-800/30"} rounded-br-lg transition-colors duration-200 group-hover:bg-green-200 group-hover:text-green-800`}
        >
          {completed}
        </div>
      </section>
    </div>
  );
}
