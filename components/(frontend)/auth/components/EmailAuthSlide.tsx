import { SetStateType } from "@/common/types/reactTypes";
import { AuthInputsType, AuthMethodType } from "../FrontendAuth";
import { Seperator } from "./InitialAuthSlide";
import { ArrowLeft, Eye, Key, LoaderCircle, Smartphone } from "lucide-react";
import { useState } from "react";
import { EyeClosedIcon } from "@radix-ui/react-icons";

export default function EmailAuthSlide({
  currAuthMethod,
  showLoader,
  authInputs,
  setAuthInputs,
  enteredPassword,
  setEnteredPassword,
  setNewUser,
  handleEmailLogin
}: {
  currAuthMethod: AuthMethodType;
  showLoader: boolean;
  authInputs: AuthInputsType;
  setAuthInputs: SetStateType<AuthInputsType>;
  enteredPassword: string;
  setEnteredPassword: SetStateType<string>;
  setNewUser: SetStateType<boolean | null>;
  handleEmailLogin: () => void;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <Seperator
        label={
          currAuthMethod === "email"
            ? authInputs.email.email
            : currAuthMethod === "mobile"
              ? `+91 ${authInputs.mobile.number}`
              : currAuthMethod === "whatsapp"
                ? `+91 ${authInputs.whatsapp.number}`
                : ""
        }
      />

      <div
        className={`text-[18px] sm:text-base *:rounded-lg *:py-3 w-full grid grid-cols-[auto_1fr] auto-rows-min gap-y-3.5 gap-x-3.5`}
      >
        <div className="flex items-center justify-start gap-2 text-sm">
          <Smartphone
            strokeWidth={1.5}
            width={18}
          />
          <span>Mobile</span>
        </div>
        <div className="px-4 group flex items-center justify-stretch gap-x-2 relative border border-ash-3/40 text-charcoal-3 bg-transparent transition-all duration-300 hover:border-charcoal-3/80 focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-ash-3/60">
          <input
            type="text"
            name="Mobile"
            placeholder="Mobile No."
            value={authInputs.mobile.number}
            onChange={(e) =>
              setAuthInputs((prev) => ({
                ...prev,
                mobile: {
                  number: e.target.value.replace(/\D/g, "").substring(0, 10)
                }
              }))
            }
            className="relative text-charcoal-3 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-charcoal-3/60 w-full"
          />
        </div>
        <div className="flex items-center justify-start gap-2 text-sm">
          <Key
            strokeWidth={1.5}
            width={18}
          />
          <span>Password</span>
        </div>
        <div className="px-4 group flex items-center justify-stretch gap-x-2 relative border border-ash-3/40 text-charcoal-3 bg-transparent transition-all duration-300 hover:border-charcoal-3/65 focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-ash-3/60">
          <div className="grid *:row-start-1 *:col-start-1">
            <input
              type="text"
              name="PasswordReadOnly"
              placeholder="Min. length 6"
              value={
                showPassword
                  ? enteredPassword
                  : enteredPassword.replace(/./g, "*")
              }
              readOnly
              className="relative text-charcoal-3 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-ivory-3/60 w-full"
            />
            <input
              type="password"
              name="PasswordMain"
              placeholder="Min. length 6"
              value={enteredPassword}
              onChange={(e) =>
                setEnteredPassword((prev) => e.target.value.substring(0, 20))
              }
              className="text-transparent relative text-charcoal-3 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-ivory-3/60 w-full"
            />
          </div>
          <div
            className="bg-ivory cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeClosedIcon
                strokeWidth={1.5}
                width={19}
              />
            ) : (
              <Eye
                strokeWidth={1.5}
                width={19}
              />
            )}
          </div>
        </div>

        <div
          onClick={!showLoader ? handleEmailLogin : () => {}}
          className={`px-4 col-span-2 bg-sienna text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300 ${showLoader ? "brightness-75" : ""}`}
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
          className="cursor-pointer text-sm w-fit flex items-center justify-start gap-2 text-charcoal-3/85 underline underline-offset-4 transition-all duration-300 hover:text-charcoal"
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
