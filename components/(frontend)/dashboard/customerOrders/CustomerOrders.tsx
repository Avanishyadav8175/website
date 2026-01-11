"use client";

// constants
import { FILTERS } from "./constants/filter";
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// hooks
import { useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import CustomerOrderList from "./components/CustomerOrderList";
import { GoogleAnalytics } from "@next/third-parties/google";

// types
import { type OrderFilter } from "./types/filter";

export default function CustomerOrders() {
  // hooks
  const {
    profile: {
      data: { orders }
    }
  } = useAppStates();

  // states
  const [filter, setFilter] = useState<OrderFilter>("All");

  return (
    <>
      <section className="flex flex-col justify-start">
        <section className="overflow-auto lg:pt-5 lg:mb-2 *:whitespace-nowrap scrollbar-hide flex items-center justify-start border-b border-charcoal-3/15 gap-2">
          {FILTERS.map((tab, index) => (
            <div
              onClick={() => {
                setFilter(tab);
              }}
              className={`capitalize flex items-center justify-center w-28 cursor-pointer py-3 border-b-[3px] max-lg:px-4 ${filter === tab ? "border-sienna text-sienna font-semibold" : "border-transparent hover:border-charcoal-3/20"} transition-all duration-300`}
              key={index}
            >
              {tab}
            </div>
          ))}
        </section>
        <CustomerOrderList
          orders={orders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          filter={filter}
        />
      </section>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
