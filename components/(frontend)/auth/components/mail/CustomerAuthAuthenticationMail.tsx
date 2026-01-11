"use client";

// icons
import { ArrowLeft, Key, LoaderCircle } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useState } from "react";
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

// components
import CustomerAuthSeparator from "../CustomerAuthSeparator";
import Input from "@/lib/Forms/Input/Input";

function CustomerAuthAuthenticationMail() {
  // hooks
  const {
    status,
    data: { identificationKey, identification },
    method: {
      onChangeIdentification,
      mail: { onRegister, onLogin }
    }
  } = useCustomerAuth();

  // states
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <CustomerAuthSeparator
        label={identificationKey}
        showChange
      />
      <div
        className={`text-[18px] sm:text-base *:rounded-lg *:py-3 w-full grid grid-cols-[auto_1fr] auto-rows-min gap-y-3.5 gap-x-3.5`}
      >
        <div className="flex items-center justify-start gap-2 text-sm">
          <Key
            strokeWidth={1.5}
            width={18}
          />
          <span>Password</span>
        </div>
        <div className="grid *:row-start-1 *:col-start-1">
          <Input
            type="password"
            name="password"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: password,
              setValue: setPassword
            }}
          />
        </div>
        <div
          onClick={
            status === "pending"
              ? () => {}
              : identification === "registered"
                ? () => {
                    onLogin({ password });
                  }
                : () => {
                    onRegister({ password });
                  }
          }
          className={`px-4 col-span-2 bg-sienna text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300 ${status === "pending" ? "brightness-75" : ""}`}
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
      </div>

      <CustomerAuthSeparator />

      <div className="grid grid-cols-2">
        <div
          onClick={() => {
            onChangeIdentification("unidentified");
          }}
          className="cursor-pointer text-sm w-fit flex items-center justify-start gap-2 text-charcoal-3/85 underline underline-offset-4 transition-all duration-300 hover:text-charcoal"
        >
          <ArrowLeft
            strokeWidth={1.5}
            width={16}
          />
          <span>{" Go Back"}</span>
        </div>

        <div className="cursor-pointer justify-self-end flex items-center justify-start gap-2 underline underline-offset-4 text-white/70 transition-all duration-300 hover:text-white">
          <span>Forgot Password?</span>
        </div>
      </div>
    </>
  );
}

export default memo(CustomerAuthAuthenticationMail);
