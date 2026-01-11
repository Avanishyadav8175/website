"use client";

// hooks
import { useRouter } from "next/navigation";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// providers
import { CustomerProfileProvider } from "@/hooks/useCustomerProfile";

// components
import BodyWrapper from "@/components/(frontend)/components/wrapper/BodyWrapper";
import FrontendDashboardSideTabs from "@/components/(frontend)/dashboard/tabs/FrontendDashboardSideTabs";

// types
import { type ReactNode } from "react";

export default function AccountAuthenticatedLayout({
  children
}: {
  children: ReactNode;
}) {
  // hooks
  const { push } = useRouter();
  const {
    isReady,
    auth: {
      data: { isAuthenticated }
    }
  } = useAppStates();

  if (isReady && !isAuthenticated) {
    push("/");
  }

  return (
    <CustomerProfileProvider>
      <BodyWrapper>
        <div className="grid relative grid-cols-1 lg:grid-cols-[280px_1fr] lg:min-h-[calc(100dvh_-_76px)] pb-10">
          <FrontendDashboardSideTabs />
          {children}
        </div>
      </BodyWrapper>
    </CustomerProfileProvider>
  );
}
