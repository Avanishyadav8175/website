// utils
import { lazy } from "react";

// components
const VendorCount = lazy(() => import("./VendorCount"));
import { Suspense } from "react";

export default function VendorLabel() {
  return (
    <span className="flex items-center justify-between pr-2.5 gap-2">
      <span>Vendor</span>
      <Suspense fallback={<></>}>
        <VendorCount />
      </Suspense>
    </span>
  );
}
