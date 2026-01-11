// utils
import { lazy } from "react";

// components
const NewOrderCount = lazy(() => import("./NewOrderCount"));
import { Suspense } from "react";

export default function NewOrderLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>New Orders</span>
      <Suspense fallback={<></>}>
        <NewOrderCount />
      </Suspense>
    </span>
  );
}
