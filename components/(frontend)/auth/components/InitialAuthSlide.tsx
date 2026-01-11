import { SetStateType } from "@/common/types/reactTypes";
import { LoaderCircle } from "lucide-react";
import { AuthInputsType, AuthMethodType } from "../FrontendAuth";

export default function FrontendAuthFirstSlide({
  currAuthMethod,
  setCurrAuthMethod,
  newUser,
  showLoader,
  onClick,
  authInputs,
  setAuthInputs
}: {
  currAuthMethod: AuthMethodType;
  setCurrAuthMethod: SetStateType<AuthMethodType>;
  showLoader: boolean;
  newUser: boolean | null;
  onClick: () => void;
  authInputs: AuthInputsType;
  setAuthInputs: SetStateType<AuthInputsType>;
}) {
  return (
    <div
      className={`min-w-[calc(100dvw_-_32px)] sm:min-w-[calc(400px_-_32px)] grid grid-cols-1 auto-rows-min gap-y-7 sm:gap-y-6 transition-all duration-500 ease-out ${newUser === null ? "translate-x-0" : "-translate-x-[100dvw] sm:-translate-x-[400px]"}`}
    >
      <Seperator label="Login or Signup" />

      <div
        className={`grid text-[18px] sm:text-base *:rounded-lg *:px-4 *:py-3 ${currAuthMethod === "email" ? "w-full grid grid-cols-1 grid-row-2 gap-3.5" : currAuthMethod === "google" ? "" : "grid grid-cols-[70px_1fr] sm:grid-cols-[70px_calc(400px_-_116px)] grid-row-2 gap-3.5"}`}
      >
        {currAuthMethod === "email" ? (
          <>
            <input
              type="text"
              name="Email"
              placeholder="Enter Email"
              value={authInputs.email.email}
              onChange={(e) =>
                setAuthInputs((prev) => ({
                  ...prev,
                  email: { email: e.target.value }
                }))
              }
              className="border border-ash-3/40 text-charcoal-3 col-span-2 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-charcoal-3/50 hover:border-ash-3/80 focus:outline-1 focus:outline-offset-2 focus:outline-ash-3/60"
            />
          </>
        ) : currAuthMethod === "google" ? (
          <>
            <div className="animate-pulse text-charcoal-3 flex items-center justify-center text-[16px] h-[117px] sm:h-[112px]">
              Redirecting you to Google
            </div>
          </>
        ) : (
          <>
            <div className="border border-ash-3/40 text-charcoal-3 grid place-items-center">
              +91
            </div>
            <input
              type="text"
              name="Number"
              placeholder={
                currAuthMethod === "mobile"
                  ? "Enter Mobile"
                  : "Enter Whatsapp No."
              }
              value={
                currAuthMethod === "mobile"
                  ? authInputs.mobile.number
                  : authInputs.whatsapp.number
              }
              onChange={(e) => {
                const update = {
                  number: e.target.value.replace(/\D/g, "").substring(0, 10)
                };

                setAuthInputs((prev) =>
                  currAuthMethod === "mobile"
                    ? {
                      ...prev,
                      mobile: update
                    }
                    : {
                      ...prev,
                      whatsapp: update
                    }
                );
              }}
              className="w-[calc(100dvw_-_117px)] sm:w-[calc(400px_-_117px)]  border border-ash-3/40 text-charcoal-3 outline-none bg-transparent autofill:bg-transparent transition-all duration-300 placeholder:text-charcoal-3/60 hover:border-ash-3/80 focus:outline-1 focus:outline-offset-2 focus:outline-ash-3/60"
            />
          </>
        )}
        {/* ❌ OTP Button Removed - Only Google Login Available */}
        {currAuthMethod !== "google" ? (
          <div
            onClick={!showLoader ? onClick : () => { }}
            className={`col-span-2 bg-sienna text-white flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-300 ${showLoader ? "brightness-75" : ""}`}
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
            <span>Send OTP</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* or login via ---------------------------------- */}
      <Seperator label="or" />

      {/* other auth methods --------------------------------- */}
      <div className="flex items-center justify-center gap-x-12 gap-y-3">
        {/* ❌ Mobile Login Disabled */}
        {/* {currAuthMethod === "mobile" ? (
          <></>
        ) : (
          <OtherAuthType
            label="Mobile"
            onClick={() => setCurrAuthMethod("mobile")}
            svg={
              <Smartphone
                strokeWidth={1.5}
                width={23}
              />
            }
          />
        )} */}

        {/* ❌ WhatsApp Login Disabled */}
        {/* {currAuthMethod === "whatsapp" ? (
          <></>
        ) : (
          <OtherAuthType
            label="Whatsapp"
            onClick={() => setCurrAuthMethod("whatsapp")}
            svg={
              <WhatsappSVG
                strokeWidth={1.5}
                dimensions={20}
                className="scale-[1.5]"
              />
            }
          />
        )} */}

        {/* ✔ Google Login - Only Active Method */}
        {currAuthMethod === "google" ? (
          <></>
        ) : (
          <OtherAuthType
            label="Google"
            onClick={() => setCurrAuthMethod("google")}
            svg={<span className="text-3xl scale-90 ">G</span>}
          />
        )}

        {/* ❌ Email Login Disabled */}
        {/* {currAuthMethod === "email" ? (
          <></>
        ) : (
          <OtherAuthType
            label="Email"
            onClick={() => setCurrAuthMethod("email")}
            svg={
              <Mail
                strokeWidth={1.5}
                width={23}
              />
            }
          />
        )} */}
      </div>
    </div>
  );
}
const OtherAuthType = ({
  svg,
  label,
  onClick
}: {
  svg: JSX.Element | string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="group flex flex-col justify-start items-center cursor-pointer text-charcoal-3/80 gap-y-1.5 sm:gap-y-1 transition-all duration-500"
      onClick={onClick}
    >
      <div className="group-hover:text-sienna group-hover:border-sienna rounded-full aspect-square max-sm:border border-charcoal-3/20 w-16 h-16 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-500">
        {svg}
      </div>
      <span className="group-hover:text-sienna text-sm sm:font-light transition-all duration-500">
        {label}
      </span>
    </div>
  );
};

export const Seperator = ({ label }: { label?: string }) => (
  <div
    className={`grid ${label ? "grid-cols-[1fr_auto_1fr] gap-x-5" : "grid-cols-[1fr_1fr] gap-x-0"}  text-charcoal-3/50 sm:text-sm`}
  >
    <span className="grid grid-cols-1 items-center">
      <span className="h-[1px] bg-charcoal-3/20" />
    </span>
    {label ? <span>{label}</span> : <></>}
    <span className="grid grid-cols-1 items-center">
      <span className="h-[1px] bg-charcoal-3/20" />
    </span>
  </div>
);
