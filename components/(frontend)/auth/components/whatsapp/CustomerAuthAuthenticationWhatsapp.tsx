"use client";

// icons
import { ArrowLeft, KeyRound, LoaderCircle } from "lucide-react";

// regular expressions
import { REGEXP_ONLY_DIGITS } from "input-otp";

// constants
import { RESEND_OTP_TIMEOUT, SEND_OTP_TIMEOUT } from "../../constants/timeouts";

// utils
import { memo } from "react";

// hooks
import { useCallback, useEffect, useState } from "react";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

// components
import CustomerAuthSeparator from "../CustomerAuthSeparator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

function CustomerAuthAuthenticationWhatsapp() {
  // hooks
  const {
    status,
    data: { identificationKey, identification, isOTPSend, isOTPResend },
    method: {
      onChangeIdentification,
      whatsapp: { onResendOTP, onVerifyOTP }
    }
  } = useCustomerAuth();

  // states
  const [otp, setOTP] = useState<string>("");
  const [resendTimeout, setResendTimeout] = useState<number>(SEND_OTP_TIMEOUT);

  // event handlers
  const handleCountdown = useCallback(() => {
    const intervalId = setInterval(() => {
      setResendTimeout((prevResendTimeout) => {
        if (prevResendTimeout <= 1) {
          clearInterval(intervalId);
          return 0;
        }

        return prevResendTimeout - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // side effects
  useEffect(() => {
    if (isOTPSend) {
      setResendTimeout(SEND_OTP_TIMEOUT);
      handleCountdown();
    }
  }, [isOTPSend, handleCountdown]);

  useEffect(() => {
    if (isOTPResend) {
      setResendTimeout(RESEND_OTP_TIMEOUT);
      handleCountdown();
    }
  }, [isOTPResend, handleCountdown]);

  useEffect(() => {
    if (otp.length === 4) {
      onVerifyOTP({ otp });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <>
      <CustomerAuthSeparator
        label={identificationKey}
        showChange
      />
      <div
        className={`text-[18px] lg:text-base *:rounded-lg w-full grid grid-cols-1 auto-rows-min gap-y-3.5 gap-x-3.5 -mt-1`}
      >
        <div className="flex items-center justify-center gap-2 text-sm -mb-2.5">
          <KeyRound
            strokeWidth={1.5}
            width={18}
          />
          <span>Enter OTP</span>
        </div>
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(newOTP) => setOTP(newOTP)}
        >
          <InputOTPGroup>
            {Array.from({ length: 4 }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div
          onClick={
            status === "pending"
              ? () => {}
              : () => {
                  onVerifyOTP({ otp });
                }
          }
          className={`px-4 py-3 mt-3 bg-green-600 text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300 ${status === "pending" ? "brightness-75" : ""}`}
        >
          {status === "pending" ? (
            <LoaderCircle
              strokeWidth={1.5}
              width={22}
              className="animate-spin"
            />
          ) : (
            <></>
          )}
          <span>{identification === "registered" ? "Login" : "Register"}</span>
        </div>
        <section className="flex justify-end pr-2">
          {resendTimeout ? (
            <span>{`Resend OTP in ${resendTimeout}s`}</span>
          ) : (
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => {
                onResendOTP();
              }}
            >
              Resend OTP
            </span>
          )}
        </section>
      </div>
      <CustomerAuthSeparator />
      <div className="grid grid-cols-2">
        <div
          onClick={() => {
            onChangeIdentification("unidentified");
          }}
          className="cursor-pointer w-fit flex items-center justify-start gap-2 text-charcoal-3/90 underline underline-offset-4 transition-all duration-300 hover:text-charcoal"
        >
          <ArrowLeft
            strokeWidth={1.5}
            width={16}
          />
          <span>{" Go Back"}</span>
        </div>
      </div>
    </>
  );
}

export default memo(CustomerAuthAuthenticationWhatsapp);
