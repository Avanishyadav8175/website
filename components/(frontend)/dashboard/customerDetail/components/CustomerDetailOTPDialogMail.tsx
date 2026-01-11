// icons
import { KeyRound, LoaderCircle } from "lucide-react";

// regular expressions
import { REGEXP_ONLY_DIGITS } from "input-otp";

// hooks
import { useEffect, useState } from "react";

// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

export default function CustomerDetailOTPDialogMail({
  showDialog,
  mail,
  verificationCode,
  onChangeShowDialog,
  onVerify
}: {
  showDialog: boolean;
  mail: string;
  verificationCode: string;
  onChangeShowDialog: (newShowDialog: boolean) => void;
  onVerify: (isVerified: "verified" | "not-verified") => void;
}) {
  // states
  const [otp, setOTP] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // event handlers

  // side effects
  useEffect(() => {
    if (otp.length === 4) {
      setIsChecking(true);

      setTimeout(() => {
        if (otp === verificationCode) {
          onVerify("verified");
          setIsChecking(false);
          onChangeShowDialog(false);
        } else {
          onVerify("not-verified");
          setIsChecking(false);
          onChangeShowDialog(false);
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <Dialog
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <DialogContent className="min-w-fit z-[995] !rounded-2xl outline-none border-none gap-0 *:text-center w-[360px] gap-y-1">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 text-xl font-light pt-1">
          <span>Enter OTP</span>
        </div>
        <span className="text-sm text-charcoal-3/75 pb-1">
          An OTP was sent to {mail}
        </span>
        {isChecking && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/60">
            <LoaderCircle
              className="animate-spin"
              strokeWidth={2}
              width={20}
              height={20}
            />
          </div>
        )}
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(newOTP) => setOTP(newOTP)}
          className="min-w-fit w-[340px]"
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
        {/* {resendTimeout ? (
          <span className="text-charcoal-3/40 cursor-pointer hover:underline hover:underline-offset-2 pt-3.5">
            {`Resend OTP in ${resendTimeout}s`}
          </span>
        ) : (
          <span
            className="text-blue-500 cursor-pointer hover:underline hover:underline-offset-2 pt-3.5"
            onClick={() => {
              onResend();
            }}
          >
            Resend OTP
          </span>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
