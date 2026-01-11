"use client";

// redux
import { store } from "@/store/store";

// providers
import { Provider } from "react-redux";

// hooks
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// layouts
import AdminSidebar from "@/layouts/admin/sidebar/AdminSidebar";

// icons
import { LoaderCircle } from "lucide-react";

// types
import { type Children } from "@/common/types/reactTypes";
import { ROOT_ADMIN_ROUTE } from "@/common/routes/admin/staticLinks";

export default function AdminRoot({ children }: { children: Children }) {
  // hooks
  const { replace } = useRouter();

  const {
    status,
    data: { isAuthenticated },
    method: { validate }
  } = useAdminAuth();

  // effects
  useEffect(() => {
    if (status === "initial") {
      validate();
    }
  }, [status, validate]);

  // return
  if (status === "initial") {
    return (
      <div className="h-device w-device flex items-center justify-center text-charcoal-3/70 text-3xl">
        Loading
      </div>
    );
  }

  if (!isAuthenticated) {
    replace(`${ROOT_ADMIN_ROUTE}/login`);
  }

  if (isAuthenticated) {
    return (
      <Provider store={store}>
        <div className="h-device w-device grid grid-cols-1 sm:grid-cols-[auto_1fr] overflow-y-hidden overflow-x-hidden">
          <AdminSidebar />
          <main className="sm:px-6 sm:pt-4 relative max-h-device">
            {children}
          </main>
        </div>
      </Provider>
    );
  }
}
