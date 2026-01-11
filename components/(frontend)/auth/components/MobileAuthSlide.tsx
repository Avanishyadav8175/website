import { SetStateType } from "@/common/types/reactTypes";
import { AuthInputsType, AuthMethodType } from "../FrontendAuth";
import { Seperator } from "./InitialAuthSlide";
import { ArrowLeft, KeyRound, LoaderCircle } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function MobileAuthSlide({
  currAuthMethod,
  showLoader,
  authInputs,
  enteredOTP,
  setEnteredOTP,
  setNewUser,
  handleOTPLogin
}: {
  currAuthMethod: AuthMethodType;
  showLoader: boolean;
  authInputs: AuthInputsType;
  enteredOTP: string;
  setEnteredOTP: SetStateType<string>;
  setNewUser: SetStateType<boolean | null>;
  handleOTPLogin: () => void;
}) {
  return (
    <>
      <Seperator
        label={
          currAuthMethod === "mobile"
            ? `+91 ${authInputs.mobile.number}`
            : currAuthMethod === "whatsapp"
              ? `+91 ${authInputs.whatsapp.number}`
              : ""
        }
      />

      <div
        className={`text-[18px] sm:text-base *:rounded-lg w-full grid grid-cols-1 auto-rows-min gap-y-3.5 gap-x-3.5 -mt-1`}
      >
        <div className="flex items-center justify-center gap-2 text-sm -mb-2.5">
          <KeyRound
            strokeWidth={1.5}
            width={18}
          />
          <span>Enter OTP</span>
        </div>
        {/* <div className="px-4 py-3 group flex items-center justify-stretch gap-x-2 relative border border-ash-3/40 text-ivory-3 bg-transparent transition-all duration-300 hover:border-ash-3/80 focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-ash-3/60">
        </div> */}
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          value={enteredOTP}
          onChange={(otp) => setEnteredOTP((prev) => otp)}
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
          onClick={!showLoader ? handleOTPLogin : () => {}}
          className={`px-4 py-3 mt-3 bg-sienna text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300 ${showLoader ? "brightness-75" : ""}`}
        >
          {showLoader ? (
            <LoaderCircle
              strokeWidth={1.5}
              width={22}
              className="animate-spin"
            />
          ) : (
            <></>
          )}
          <span>Confirm</span>
        </div>
      </div>

      <Seperator />

      <div className="grid grid-cols-2">
        <div
          onClick={() => setNewUser((prev) => null)}
          className="cursor-pointer w-fit flex items-center justify-start gap-2 text-charcoal-3/90 underline underline-offset-4 transition-all duration-300 hover:text-charcoal"
        >
          <ArrowLeft
            strokeWidth={1.5}
            width={16}
          />{" "}
          <span>Go Back</span>
        </div>

        {/* <div className="cursor-pointer justify-self-end flex items-center justify-start gap-2 underline underline-offset-4 text-white/70 transition-all duration-300 hover:text-white">
                <span>Forgot ?</span>
              </div> */}
      </div>
    </>
  );
}
