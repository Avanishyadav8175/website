"use client";

// utils
import { memo } from "react";

// hooks
import { useEffect } from "react";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

function CustomerAuthAuthenticationGoogle() {
  const {
    method: {
      google: { onLogin }
    }
  } = useCustomerAuth();

  useEffect(() => {
    onLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-pulse text-charcoal-3 flex items-center justify-center text-base h-28">
      Google is Authenticating You...
    </div>
  );
}

export default memo(CustomerAuthAuthenticationGoogle);
