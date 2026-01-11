"use client";

// utils
import { memo } from "react";

// hooks
import { useState } from "react";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";
import { useToast } from "@/components/ui/use-toast";

// components
import CountryCodes from "@/components/custom/inputs/countryCodes/CountryCodes";

function CustomerAuthIdentificationMobile() {
  // hooks
  const {
    method: {
      mobile: { onSendOTP: sendOTP }
    }
  } = useCustomerAuth();
  const { toast } = useToast();

  // states
  const [mobileNumber, setMobileNumber] = useState<string>("");

  return (
    <>
      {/* <CountryCodes
        isExpanded={showCountryCodes}
        selected={countryCode}
        onChangeIsExpanded={setShowCountryCode}
        onSelect={setCountryCode}
      /> */}
      <div className="font-medium text-lg !px-0">+91 -</div>
      <input
        type="text"
        name="Number"
        placeholder="Enter Mobile No."
        value={mobileNumber}
        onChange={(e) => {
          setMobileNumber(e.target.value.replace(/\D/g, "").substring(0, 10));
        }}
        className="w-full sm:w-[calc(500px_-_88px)]  border-b  border-ash-3/70 text-charcoal-3 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-charcoal-3/60 !px-0 !rounded-none hover:border-ash-3/80 focus:border-sienna-1/50 font-medium text-lg"
      />
      <div
        onClick={() => {
          if (mobileNumber.length === 10) {
            sendOTP({ mobileNumber: `+91-${mobileNumber}` });
          } else {
            toast({
              title: "Invalid Mobile Number",
              description: "Please enter a valid Mobile Number to continue",
              variant: "warning"
            });
          }
        }}
        className={`col-span-2 bg-green-600 text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300`}
      >
        <span>Send OTP</span>
      </div>
    </>
  );
}

export default memo(CustomerAuthIdentificationMobile);
