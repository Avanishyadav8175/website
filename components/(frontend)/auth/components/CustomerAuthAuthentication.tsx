// utils
import { memo } from "react";

// hooks
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

// components
import CustomerAuthAuthenticationMail from "./mail/CustomerAuthAuthenticationMail";
import CustomerAuthAuthenticationMobile from "./mobile/CustomerAuthAuthenticationMobile";
import CustomerAuthAuthenticationWhatsapp from "./whatsapp/CustomerAuthAuthenticationWhatsapp";

function CustomerAuthAuthentication() {
  const {
    data: { method, identification }
  } = useCustomerAuth();

  return (
    <div
      className={`text-charcoal-3 relative min-w-[calc(100dvw_-_32px)] sm:min-w-[468px] grid grid-cols-1 auto-rows-min gap-y-7 lg:gap-y-6 transition-all duration-500 ${identification === "unidentified" ? "-translate-x-0" : "max-sm:-translate-x-[calc(100dvw_+_16px)] sm:-translate-x-[516px]"}`}
    >
      {method === "mail" && <CustomerAuthAuthenticationMail />}
      {method === "mobile" && <CustomerAuthAuthenticationMobile />}
      {method === "whatsapp" && <CustomerAuthAuthenticationWhatsapp />}
    </div>
  );
}

export default memo(CustomerAuthAuthentication);
