"use client";

// constants
import { REGEX_TEST } from "@/common/constants/regex";

// utils
import { memo } from "react";

// hooks
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

function CustomerAuthIdentificationMail() {
  // hooks
  const {
    data: { identificationKey },
    method: {
      mail: { onIdentify }
    }
  } = useCustomerAuth();
  const { toast } = useToast();

  // states
  const [mail, setMail] = useState<string>(identificationKey || "");

  return (
    <>
      <input
        type="text"
        name="Email"
        placeholder="Enter Email"
        value={mail}
        onChange={(e) => {
          setMail(e.target.value);
        }}
        className="border border-ash-3/40 text-charcoal-3 col-span-2 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-charcoal-3/50 hover:border-ash-3/80 focus:outline-1 focus:outline-offset-2 focus:outline-ash-3/60"
      />
      <div
        onClick={() => {
          if (REGEX_TEST.EMAIL.test(mail)) {
            onIdentify({ mail });
          } else {
            toast({
              title: "Invalid Mail",
              description: "Please enter a valid Email ID to continue",
              variant: "warning"
            });
          }
        }}
        className={`col-span-2 bg-sienna text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300`}
      >
        <span>Proceed</span>
      </div>
    </>
  );
}

export default memo(CustomerAuthIdentificationMail);
