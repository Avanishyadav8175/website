// utils
import { lazy } from "react";

// components
const InProgressOrderCount = lazy(() => import("./InProgressOrderCount"));
import { Suspense } from "react";

export default function InProgressOrderLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Running Orders</span>
      <Suspense fallback={<></>}>
        <InProgressOrderCount />
      </Suspense>
    </span>
  );
}
