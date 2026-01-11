"use client";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCartAction,
  selectCart
} from "@/store/features/dynamic/cartSlice";
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";
import {
  createDeliveryTypeAction,
  selectDeliveryType
} from "@/store/features/presets/deliveryTypeSlice";
import {
  createOrderAction,
  selectOrder
} from "@/store/features/dynamic/orderSlice";

// components
import Bookings from "./Bookings";
import Calendar from "./Calendar";

export default function BookingCalender() {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const orderStatus = useSelector(selectOrder.status);
  const cartStatus = useSelector(selectCart.status);
  const contentStatus = useSelector(selectContent.status);
  const deliveryTypeStatus = useSelector(selectDeliveryType.status);

  // states
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // side effects
  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(createCartAction.fetchDocumentList());
    }
  }, [cartStatus, dispatch]);

  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(createOrderAction.fetchDocumentList());
    }
  }, [orderStatus, dispatch]);

  useEffect(() => {
    if (deliveryTypeStatus === "idle") {
      dispatch(createDeliveryTypeAction.fetchDocumentList());
    }
  }, [deliveryTypeStatus, dispatch]);

  return (
    <section className="flex max-sm:flex-col items-start justify-center gap-4 sm:gap-6 w-full max-sm:overflow-x-hidden max-sm:overflow-y-scroll max-sm:px-2">
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Bookings selectedDate={selectedDate} />
    </section>
  );
}
