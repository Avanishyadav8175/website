// utils
import { lazy } from "react";

// components
const VendorRequestCount = lazy(() => import("./VendorRequestCount"));
import { Suspense } from "react";

export default function VendorRequestLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Contact Us Form</span>
      <Suspense fallback={<></>}>
        <VendorRequestCount />
      </Suspense>
    </span>
  );
}
