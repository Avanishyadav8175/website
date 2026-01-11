"use client";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// utils
import { lazy } from "react";

// hooks
import { useState } from "react";

// components
import CustomerDetail from "./components/CustomerDetail";
const CustomerDetailForm = lazy(
  () => import("./components/CustomerDetailForm")
);
import CustomerDetailWrapper from "./components/CustomerDetailWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";

export default function CustomerDetails() {
  // states
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <CustomerDetailWrapper>
        {showForm ? (
          <Suspense>
            <CustomerDetailForm
              onCloseForm={() => {
                setShowForm(false);
              }}
            />
          </Suspense>
        ) : (
          <CustomerDetail
            onShowForm={() => {
              setShowForm(true);
            }}
          />
        )}
      </CustomerDetailWrapper>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
