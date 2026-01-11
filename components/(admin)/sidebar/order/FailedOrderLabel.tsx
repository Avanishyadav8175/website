// utils
import { lazy } from "react";

// components
const FailedOrderCount = lazy(() => import("./FailedOrderCount"));
import { Suspense } from "react";

export default function FailedOrderLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Failed Orders</span>
      <Suspense fallback={<></>}>
        <FailedOrderCount />
      </Suspense>
    </span>
  );
}
