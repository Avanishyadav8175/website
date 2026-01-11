// utils
import { lazy } from "react";

// components
const CancelledOrderCount = lazy(() => import("./CancelledOrderCount"));
import { Suspense } from "react";

export default function CancelledOrderLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Cancelled Orders</span>
      <Suspense fallback={<></>}>
        <CancelledOrderCount />
      </Suspense>
    </span>
  );
}
