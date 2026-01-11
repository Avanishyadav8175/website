// utils
import { memo } from "react";

// hooks
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

// components
import CustomerAuthAuthenticationGoogle from "./google/CustomerAuthAuthenticationGoogle";
import CustomerAuthIdentificationMail from "./mail/CustomerAuthIdentificationMail";
import CustomerAuthIdentificationMobile from "./mobile/CustomerAuthIdentificationMobile";
import CustomerAuthIdentificationWhatsapp from "./whatsapp/CustomerAuthIdentificationWhatsapp";
import CustomerAuthMethods from "./CustomerAuthMethods";
import CustomerAuthSeparator from "./CustomerAuthSeparator";

function CustomerAuthIdentification() {
  const {
    data: { method, identification }
  } = useCustomerAuth();

  return (
    <div
      className={`min-w-[calc(100dvw_-_32px)] sm:min-w-[calc(500px_-_32px)] grid grid-cols-1 auto-rows-min gap-y-4 transition-all duration-500 ease-out ${identification === "unidentified" ?  "translate-x-0" : "-translate-x-[100dvw] sm:-translate-x-[500px]"}`}
    >
      {/* <CustomerAuthSeparator label="Login or Register" /> */}
      <div
        className={`grid text-base *:rounded-lg *:px-4 *:py-3 ${method === "mail" ? "w-full grid grid-cols-1 grid-rows-2 gap-3.5" : method === "google" ? "" : "grid grid-cols-[50px_1fr] sm:grid-cols-[50px_calc(500px_-_86px)] grid-rows-2 gap-x-0.5 gap-y-3.5"}`}
      >
        {method === "mail" && <CustomerAuthIdentificationMail />}
        {method === "mobile" && <CustomerAuthIdentificationMobile />}
        {method === "whatsapp" && <CustomerAuthIdentificationWhatsapp />}
        {method === "google" && <CustomerAuthAuthenticationGoogle />}
      </div>
      <CustomerAuthMethods />
    </div>
  );
}

export default memo(CustomerAuthIdentification);
