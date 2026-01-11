// icons
import { Check, LoaderCircle } from "lucide-react";

// response
import {
  mobileIdentify,
  mobileResendOTP,
  mobileSendOTP
} from "@/request/auth/mobile";

// hooks
import { useEffect, useState } from "react";

// components
import CountryCodes from "@/components/custom/inputs/countryCodes/CountryCodes";
import CustomerDetailOTPDialogMobile from "./CustomerDetailOTPDialogMobile";
import Input from "@/lib/Forms/Input/Input";

// types
import { type Availability, type Verified } from "../type/type";
import { ClassNameType } from "@/common/types/reactTypes";
import { whatsappResendOTP, whatsappSendOTP } from "@/request/auth/whatsapp";

export default function CustomerDetailFormMobile({
  prevMobileNumber,
  mobileNumber,
  canCheckMobileAvailability,
  isAvailable,
  isVerified,
  className,
  onChangeMobileNumber,
  onChangeIsAvailable,
  onChangeIsVerified
}: {
  prevMobileNumber: string;
  mobileNumber: string;
  canCheckMobileAvailability: boolean;
  isAvailable: Availability;
  isVerified: Verified;
  className?: ClassNameType;
  onChangeMobileNumber: (newMobileNumber: string) => void;
  onChangeIsAvailable: (newIsAvailable: Availability) => void;
  onChangeIsVerified: (newIsVerified: Verified) => void;
}) {
  // states
  const [showCountryCodes, setShowCountryCodes] = useState<boolean>(false);
  const [showOTPDialog, setShowOTPDialog] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [otpOrderId, setOTPOrderId] = useState<string>("");
  const [isOTPSend, setIsOTPSend] = useState<boolean>(false);
  const [isOTPResend, setIsOTPResend] = useState<boolean>(false);

  // variables
  const [prevCountryCode, prevMobile] = prevMobileNumber.split("-");
  const [countryCode, mobile] = mobileNumber.split("-");

  // event handlers
  const handleCheckAvailability = () => {
    setIsChecking(true);

    mobileIdentify({ mobileNumber })
      .then(({ data }) => {
        if (data) {
          onChangeIsAvailable(
            data.identification === "registered" ? "not-available" : "available"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  const handleSendOTP = () => {
    setIsChecking(true);

    whatsappSendOTP({ whatsappNumber: "+91-" + mobileNumber })
      .then(({ data }) => {
        if (data && data.orderId) {
          setIsOTPSend(true);
          setOTPOrderId(data.orderId);
          setShowOTPDialog(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  const handleResendOTP = () => {
    setIsOTPResend(false);
    setIsChecking(true);

    whatsappResendOTP({ orderId: otpOrderId })
      .then(({ data }) => {
        if (data && data.orderId) {
          setIsOTPResend(true);
          setOTPOrderId(data.orderId);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  // side effects
  useEffect(() => {
    onChangeIsAvailable("not-checked");
    onChangeIsVerified("not-checked");
    setOTPOrderId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumber]);

  useEffect(() => {
    if (!otpOrderId) {
      setIsOTPSend(false);
      setIsOTPResend(false);
    }
  }, [otpOrderId]);

  return (
    <>
      <section className="space-y-1.5">
        <span className="font-medium">Mobile Number</span>
        <section
          className={`flex items-center gap-1 transition-all duration-300 ${className || ""} !py-1.5`}
        >
          <CountryCodes
            isExpanded={showCountryCodes}
            selected={countryCode || "+91"}
            onChangeIsExpanded={setShowCountryCodes}
            onSelect={(countryCode) => {
              onChangeMobileNumber(`${countryCode}-${mobile}`);
            }}
            theme="transparent"
          />
          <Input
            customStyle="outline-none bg-transparent w-full py-1.5 text-lg"
            type="number"
            name="Mobile"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: mobile || "",
              setValue: (mobile) => {
                onChangeMobileNumber(`${countryCode}-${mobile}`);
              }
            }}
          />
          {canCheckMobileAvailability ? (
            isChecking ? (
              <LoaderCircle
                className="animate-spin"
                strokeWidth={2}
                width={22}
                height={22}
              />
            ) : isAvailable === "not-checked" ? (
              <span
                className="py-0.5 text-blue-500 text-[13px] cursor-pointer whitespace-nowrap underline underline-offset-4 transition-colors duration-300 hover:text-blue-600"
                onClick={handleCheckAvailability}
              >
                {"Check Availability"}
              </span>
            ) : isAvailable === "available" ? (
              isVerified === "verified" ? (
                <Check
                  className="text-green-600"
                  strokeWidth={2}
                  width={20}
                  height={20}
                />
              ) : (
                <span
                  className="py-0.5 text-blue-500 text-[13px] cursor-pointer hover:text-blue-600 underline underline-offset-4 whitespace-nowrap"
                  onClick={handleSendOTP}
                >
                  Verify with OTP
                </span>
              )
            ) : (
              <span className="whitespace-nowrap px-2 py-0.5 border border-yellow-600 text-yellow-600 text-xs rounded-sm">
                Already Registered
              </span>
            )
          ) : prevMobile && mobile === prevMobile ? (
            <span className="text-green-600 text-sm flex items-center justify-end gap-x-1">
              <div className="rounded-full aspect-square bg-green-500 text-white grid place-items-center p-0.5">
                <Check
                  strokeWidth={2.5}
                  width={11}
                  height={11}
                  className=""
                />
              </div>
              <span>Verified</span>
            </span>
          ) : (
            <></>
          )}
        </section>
      </section>
      <CustomerDetailOTPDialogMobile
        showDialog={showOTPDialog}
        mobileNumber={mobileNumber}
        orderId={otpOrderId}
        isOTPSend={isOTPSend}
        isOTPResend={isOTPResend}
        onChangeShowDialog={setShowOTPDialog}
        onResend={handleResendOTP}
        onVerify={onChangeIsVerified}
      />
    </>
  );
}
