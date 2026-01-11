// icons
import { KeyRound, LoaderCircle } from "lucide-react";

// regular expressions
import { REGEXP_ONLY_DIGITS } from "input-otp";

// constants
import {
  RESEND_OTP_TIMEOUT,
  SEND_OTP_TIMEOUT
} from "@/components/(frontend)/auth/constants/timeouts";

// request
import { mobileVerifyOTP } from "@/request/auth/mobile";

// hooks
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
import { whatsappVerifyOTP } from "@/request/auth/whatsapp";

export default function CustomerDetailOTPDialogMobile({
  showDialog,
  mobileNumber,
  orderId,
  isOTPSend,
  isOTPResend,
  onChangeShowDialog,
  onResend,
  onVerify
}: {
  showDialog: boolean;
  mobileNumber: string;
  orderId: string;
  isOTPSend: boolean;
  isOTPResend: boolean;
  onChangeShowDialog: (newShowDialog: boolean) => void;
  onResend: () => void;
  onVerify: (isVerified: "verified" | "not-verified") => void;
}) {
  // hooks
  const { toast } = useToast();

  // states
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [otp, setOTP] = useState<string>("");
  const [resendTimeout, setResendTimeout] = useState<number>(SEND_OTP_TIMEOUT);

  // event handlers
  const handleCountdown = () => {
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
  };

  // side effects
  useEffect(() => {
    if (isOTPSend) {
      setResendTimeout(SEND_OTP_TIMEOUT);
      handleCountdown();
    }
  }, [isOTPSend]);

  useEffect(() => {
    if (isOTPResend) {
      setResendTimeout(RESEND_OTP_TIMEOUT);
      handleCountdown();
    }
  }, [isOTPResend]);

  useEffect(() => {
    if (otp.length === 4) {
      setIsChecking(true);

      whatsappVerifyOTP({
        whatsappNumber: "+91-" + mobileNumber,
        orderId,
        otp
      })
        .then(({ data }) => {
          if (data !== null) {
            onVerify(data ? "verified" : "not-verified");

            if (data) {
              onChangeShowDialog(false);
            } else {
              toast({
                title: "Incorrect OTP",
                description: "OTP Is Not Correct, Try Again",
                variant: "destructive"
              });
            }
          } else {
            toast({
              title: "Server Error",
              description: "Couldn't verify OTP, Try Again",
              variant: "destructive"
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Incorrect OTP",
            description: "OTP Is Not Correct, Try Again",
            variant: "destructive"
          });
        })
        .finally(() => {
          setIsChecking(false);
        });
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
          An OTP was sent to {mobileNumber.split("-")[1]}
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
        {resendTimeout ? (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
