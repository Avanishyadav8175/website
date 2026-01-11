// utils
import { lazy } from "react";

// components
const CustomerCount = lazy(() => import("./CustomerCount"));
import { Suspense } from "react";

export default function CustomerLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Customers</span>
      <Suspense fallback={<></>}>
        <CustomerCount />
      </Suspense>
    </span>
  );
}
