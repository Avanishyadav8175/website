// icons
import { Check, LoaderCircle } from "lucide-react";

// response
import { mailIdentify } from "@/request/auth/mail";

// hooks
import { useEffect, useState } from "react";

// components
import CustomerDetailOTPDialogMail from "./CustomerDetailOTPDialogMail";
import Input from "@/lib/Forms/Input/Input";

// types
import { type Availability, type Verified } from "../type/type";
import { type ClassNameType } from "@/common/types/reactTypes";
import { COMPANY_NAME } from "@/common/constants/companyDetails";

export default function CustomerDetailFormMail({
  prevMail,
  mail,
  canCheckMailAvailability,
  isAvailable,
  isVerified,
  className,
  onChangeMail,
  onChangeIsAvailable,
  onChangeIsVerified
}: {
  prevMail: string;
  mail: string;
  canCheckMailAvailability: boolean;
  isAvailable: Availability;
  isVerified: Verified;
  className?: ClassNameType;
  onChangeMail: (newMail: string) => void;
  onChangeIsAvailable: (newIsAvailable: Availability) => void;
  onChangeIsVerified: (newIsVerified: Verified) => void;
}) {
  // states
  const [showOTPDialog, setShowOTPDialog] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");

  // event handlers
  const handleCheckAvailability = () => {
    setIsChecking(true);

    mailIdentify({ mail })
      .then(({ data }) => {
        if (data) {
          onChangeIsAvailable(
            data.status === "registered" ? "not-available" : "available"
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

  const handleSendVerificationCode = () => {
    const newVerificationCode = Math.floor(1000 + Math.random() * 9000);

    setVerificationCode(`${newVerificationCode}`);

    fetch("", {
      method: "POST",
      body: JSON.stringify({
        from: COMPANY_NAME,
        to: mail,
        subject: "Email Verification",
        content: `
        <p>Your verification code is: ${newVerificationCode}</p>
      `
      })
    })
      .then(async (res) => {
        const data = await res.json();
        console.log({ data });

        setShowOTPDialog(true);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  // side effects
  useEffect(() => {
    setVerificationCode("");
    onChangeIsAvailable("not-checked");
    onChangeIsVerified("not-checked");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail]);

  return (
    <>
      <section className="space-y-1.5">
        <span className="font-medium">Email Address</span>
        <section
          className={`flex items-center gap-1 transition-all duration-300 ${className || ""} !py-1.5`}
        >
          <Input
            customStyle="outline-none border-none bg-transparent w-full py-1.5 text-lg"
            type="email"
            name="mail"
            isRequired={false}
            errorCheck={false}
            validCheck={false}
            customValue={{
              value: mail,
              setValue: (mail) => {
                onChangeMail(mail);
              }
            }}
          />
          {/* {canCheckMailAvailability ? (
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
                  onClick={handleSendVerificationCode}
                >
                  Verify with OTP
                </span>
              )
            ) : (
              <span className="whitespace-nowrap px-2 py-0.5 border border-yellow-600 text-yellow-600 text-xs rounded-sm">
                already registered
              </span>
            )
          ) : prevMail && mail === prevMail ? (
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
          )} */}
        </section>
      </section>
      <CustomerDetailOTPDialogMail
        showDialog={showOTPDialog}
        mail={mail}
        verificationCode={verificationCode}
        onChangeShowDialog={setShowOTPDialog}
        onVerify={onChangeIsVerified}
      />
    </>
  );
}
