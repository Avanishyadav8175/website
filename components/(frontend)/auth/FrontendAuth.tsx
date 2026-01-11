import { IS_USER_LOGGEDIN } from "@/common/constants/sessionKeys";
import { SetStateType } from "@/common/types/reactTypes";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import EmailAuthSlide from "./components/EmailAuthSlide";
import FrontendAuthFirstSlide from "./components/InitialAuthSlide";
import MobileAuthSlide from "./components/MobileAuthSlide";
import FrontendAuthUIWrapper from "./components/uiWrapper";

export type AuthMethodType = "email" | "mobile" | "google" | "whatsapp";
export type AuthInputsType = {
  email: { email: string };
  mobile: { number: string };
  google: { email: string; username: string };
  whatsapp: { number: string };
};

export default function FrontendAuth({
  openAuth,
  setOpenAuth,
  callback
}: {
  openAuth: boolean;
  setOpenAuth: SetStateType<boolean>;
  callback?: () => void;
}) {
  const [currAuthMethod, setCurrAuthMethod] =
    useState<AuthMethodType>("google"); // ✔ Default to Google Sign-In
  const [authInputs, setAuthInputs] = useState<AuthInputsType>({
    email: { email: "" },
    mobile: { number: "" },
    google: { email: "", username: "" },
    whatsapp: { number: "" }
  });
  const [enteredOTP, setEnteredOTP] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

  const [newUser, setNewUser] = useState<boolean | null>(null); //null for initial slide
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const checkFieldIsComplete = (
    authMethod: AuthMethodType,
    input: string
  ): boolean => {
    if (authMethod === "email")
      return (
        input.includes("@") &&
        input[0] !== "@" &&
        input[input.length - 1] !== "@"
      );

    return input.length === 10;
  };

  const handleContinue = {
    initialSlide: () => {
      try {
        setShowLoader((prev) => true);
        const input =
          currAuthMethod === "email"
            ? authInputs.email.email
            : currAuthMethod === "whatsapp"
              ? authInputs.whatsapp.number
              : currAuthMethod === "mobile"
                ? authInputs.mobile.number
                : null;

        if (input !== null && input.length > 0) {
          if (checkFieldIsComplete(currAuthMethod, input)) {
            // check in backend if user exists here ...........
            const userThere = false;
            if (userThere) setNewUser((prev) => false);
            else setNewUser((prev) => true);
          } else {
            alert(
              currAuthMethod === "email"
                ? "Invalid email"
                : "Mobile should be 10-digits"
            );
          }
        } else {
          alert("Field not completely filled");
        }
      } finally {
        setShowLoader((prev) => false);
      }
    }
  };

  const handleOTPLogin = () => {
    if (enteredOTP.length === 4) {
      setShowLoader((prev) => true);
      setTimeout(() => {
        // check otp is valid here...
        const isValidOTP = true;
        if (isValidOTP) {
          // login the user here...
          sessionStorage.setItem(IS_USER_LOGGEDIN, "true");
          setOpenAuth((prev) => false);
          doCleanup();
          if (callback) callback();
          // show login success message here ...
        } else {
          // show invalid otp here ....
        }
        setShowLoader((prev) => false);
      }, 500);
    }
  };

  const handleEmailLogin = () => {
    const mobileNumber = authInputs.mobile.number;
    const isPasswordValid = enteredPassword.length >= 6;
    const isMobileValid = mobileNumber.length === 10;
    if (isMobileValid && isPasswordValid) {
      setShowLoader((prev) => true);
      setTimeout(() => {
        // check otp is valid here...
        const isValidOTP = true;
        if (isValidOTP) {
          // login the user here...
          sessionStorage.setItem(IS_USER_LOGGEDIN, "true");
          setOpenAuth((prev) => false);
          doCleanup();
          if (callback) callback();
          // show login success message here ...
        } else {
          // show invalid otp here ....
        }
        setShowLoader((prev) => false);
      }, 500);
    } else {
      if (!isPasswordValid) {
        // show password not of sufficient length here ...
      } else if (!isMobileValid) {
        // show invalid mobile length here ...
      }
    }
  };

  const doCleanup = () => {
    setNewUser((prev) => null);
    setAuthInputs((prev) => ({
      email: { email: "" },
      mobile: { number: "" },
      google: { email: "", username: "" },
      whatsapp: { number: "" }
    }));
    setEnteredOTP((prev) => "");
    setEnteredPassword((prev) => "");
  };

  useEffect(() => {
    if (enteredOTP.length === 4) handleOTPLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredOTP]);

  useEffect(() => {
    if (newUser === null) {
      setEnteredOTP((prev) => "");
      setEnteredPassword((prev) => "");
    }
  }, [newUser]);

  return (
    <Sheet
      open={openAuth}
      onOpenChange={setOpenAuth}
    >
      <SheetContent
        side={"bottom"}
        className="p-0 outline-none border-none bg-ivory-1 h-[100dvh] w-[100dvw] sm:bg-black/30 sm:grid sm:place-items-center"
      >
        <FrontendAuthUIWrapper>
          {/* ===[ 1st slider ]====================== */}
          <FrontendAuthFirstSlide
            currAuthMethod={currAuthMethod}
            setCurrAuthMethod={setCurrAuthMethod}
            showLoader={showLoader}
            newUser={newUser}
            onClick={handleContinue.initialSlide}
            authInputs={authInputs}
            setAuthInputs={setAuthInputs}
          />

          {/* ===[ 2nd slider ]======================= */}
          <div
            className={`text-charcoal-3 relative min-w-[calc(100dvw_-_32px)] sm:min-w-[calc(400px_-_32px)] grid grid-cols-1 auto-rows-min gap-y-7 sm:gap-y-6 transition-all duration-500 ${newUser === null ? "-translate-x-0" : "max-sm:-translate-x-[calc(100dvw_+_16px)] sm:-translate-x-[calc(400px_+_16px)]"}`}
          >
            {currAuthMethod === "email" ? (
              <EmailAuthSlide
                currAuthMethod={currAuthMethod}
                showLoader={showLoader}
                authInputs={authInputs}
                setAuthInputs={setAuthInputs}
                enteredPassword={enteredPassword}
                setEnteredPassword={setEnteredPassword}
                setNewUser={setNewUser}
                handleEmailLogin={handleEmailLogin}
              />
            ) : currAuthMethod === "whatsapp" || currAuthMethod === "mobile" ? (
              <MobileAuthSlide
                currAuthMethod={currAuthMethod}
                showLoader={showLoader}
                authInputs={authInputs}
                enteredOTP={enteredOTP}
                setEnteredOTP={setEnteredOTP}
                setNewUser={setNewUser}
                handleOTPLogin={handleOTPLogin}
              />
            ) : (
              <></>
            )}
          </div>
        </FrontendAuthUIWrapper>
      </SheetContent>
    </Sheet>
  );
}
