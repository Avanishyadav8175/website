// utils
import { lazy } from "react";

// components
const DeliveredOrderCount = lazy(() => import("./DeliveredOrderCount"));
import { Suspense } from "react";

export default function DeliveredOrderLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Completed Orders</span>
      <Suspense fallback={<></>}>
        <DeliveredOrderCount />
      </Suspense>
    </span>
  );
}
