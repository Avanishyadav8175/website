/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { createContext, useContext, useEffect, useState } from "react";

// hooks
import { useAppStates } from "../useAppState/useAppState";
import { useSetting } from "../useSetting/useSetting";

// requests
import { verify as verifyGoogle } from "@/request/auth/google";
import { mailIdentify, mailLogin, mailRegister } from "@/request/auth/mail";
import {
  mobileResendOTP,
  mobileSendOTPAndIdentify,
  mobileVerifyOTPAndAuthenticate
} from "@/request/auth/mobile";
import {
  whatsappResendOTP,
  whatsappSendOTP,
  whatsappVerifyOTP
} from "@/request/auth/whatsapp";

// hooks
import { useToast } from "@/components/ui/use-toast";
import { useGoogleLogin } from "@react-oauth/google";

// constants
import { GOOGLE_CLIENT_ID } from "@/common/constants/environmentVariables";

// types
import { type Children } from "@/common/types/reactTypes";

// types
type CustomerAuthMethod = "mail" | "mobile" | "google" | "whatsapp";
type CustomerAuthIdentification =
  | "unidentified"
  | "registered"
  | "not-registered";

// context type
type CustomerAuth = {
  status: "pending" | "idle";
  data: {
    method: CustomerAuthMethod;
    identificationKey?: string;
    identification: CustomerAuthIdentification;
    isOTPSend: boolean;
    isOTPResend: boolean;
  };
  method: {
    onChangeMethod: (newMethod: CustomerAuthMethod) => void;
    onChangeIdentificationKey: (newIdentificationKey: string) => void;
    onChangeIdentification: (
      newIdentification: CustomerAuthIdentification
    ) => void;
    google: {
      onLogin: () => void;
    };
    mail: {
      onIdentify: ({ mail }: { mail: string }) => void;
      onLogin: ({ password }: { password: string }) => void;
      onRegister: ({ password }: { password: string }) => void;
    };
    mobile: {
      onSendOTP: ({ mobileNumber }: { mobileNumber: string }) => void;
      onResendOTP: () => void;
      onVerifyOTP: ({ otp }: { otp: string }) => void;
    };
    whatsapp: {
      onSendOTP: ({ whatsappNumber }: { whatsappNumber: string }) => void;
      onResendOTP: () => void;
      onVerifyOTP: ({ otp }: { otp: string }) => void;
    };
  };
};

// context
const CustomerAuth = createContext<CustomerAuth | undefined>(undefined);

// provider
export function CustomerAuthProvider({ children }: { children: Children }) {
  // hooks
  const {
    auth: {
      data: { showAuth },
      method: { onLogin, onChangeShowAuth }
    }
  } = useAppStates();
  const { auth } = useSetting();
  const { toast } = useToast();

  // states
  const [status, setStatus] = useState<"idle" | "pending">("idle");
  const [method, setMethod] = useState<CustomerAuthMethod>(
    auth ? auth.default : "whatsapp"
  );
  const [identificationKey, setIdentificationKey] = useState<
    undefined | string
  >();
  const [identification, setIdentification] =
    useState<CustomerAuthIdentification>("unidentified");
  const [otpOrderId, setOTPOrderId] = useState<string>("");
  const [isOTPSend, setIsOTPSend] = useState<boolean>(false);
  const [isOTPResend, setIsOTPResend] = useState<boolean>(false);

  // handlers
  // google
  const handleGoogleLogin = GOOGLE_CLIENT_ID ? useGoogleLogin({
    onSuccess: (res) => {
      verifyGoogle(res.code)
        .then(({ data: customer }) => {
          if (customer) {
            onLogin({
              customerId: customer._id as string,
              userName: customer.name || "User"
            });

            toast({
              title: "Logged in",
              description: `Welcome ${customer?.name || "User"}!`,
              variant: "success"
            });
          } else {
            console.log("no user from server");
          }
        })
        .catch(() => {
          onChangeShowAuth(false);
          toast({
            title: "Error",
            description: "Something went wrong, try again.",
            variant: "destructive"
          });
        });
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast({
        title: "Google Login Error",
        description: "Failed to initialize Google login. Please try again.",
        variant: "destructive"
      });
    },
    flow: "auth-code"
  }) : () => {
    toast({
      title: "Google Login Unavailable",
      description: "Google login is not configured.",
      variant: "destructive"
    });
  };

  // mail
  const handleMailIdentify = ({ mail }: { mail: string }) => {
    setStatus("pending");

    if (mail !== identificationKey) {
      setIdentificationKey(mail);
    }

    mailIdentify({ mail })
      .then(({ data }) => {
        setIdentification(data?.status || "unidentified");
      })
      .catch((error) => {
        console.log("mail identification error"!);
        console.log({ error });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleMailRegister = ({ password }: { password: string }) => {
    setStatus("pending");

    mailRegister({
      mail: identificationKey,
      password,
      createdBy: "Self",
      updatedBy: "Self"
    })
      .then(({ data: customer }) => {
        if (customer) {
          onLogin({
            customerId: customer._id as string,
            userName: customer.name || "User"
          });
        }

        toast({
          title: "Logged in",
          description: `Welcome ${customer?.name?.split(" ")[0] || "User"}!`,
          variant: "success"
        });
      })
      .catch((error) => {
        console.log("mail registration error"!);
        console.log({ error });

        toast({
          title: "Error",
          description: "Something went wrong, try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleMailLogin = ({ password }: { password: string }) => {
    setStatus("pending");

    mailLogin(
      {},
      {
        mail: identificationKey,
        password
      }
    )
      .then(({ data: customer }) => {
        if (customer) {
          onLogin({
            customerId: customer._id as string,
            userName: customer.name || "User"
          });
        }

        toast({
          title: "Logged in",
          description: `Welcome ${identification === "registered" ? "back " : ""}${customer?.name?.split(" ")[0] || "User"}!`,
          variant: "success"
        });
      })
      .catch((error) => {
        console.log("mail login error"!);
        console.log({ error });

        toast({
          title: "Wrong Password",
          description: "Have you forgot your password?",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  // mobile
  const handleMobileSendOTP = ({ mobileNumber }: { mobileNumber: string }) => {
    setStatus("pending");

    if (mobileNumber !== identificationKey) {
      setIdentificationKey(mobileNumber);
    }

    mobileSendOTPAndIdentify({ mobileNumber })
      .then(({ data }) => {
        setIsOTPSend(true);
        if (data?.identification) {
          setIdentification(data.identification);
        }
        if (data?.orderId) {
          setOTPOrderId(data.orderId);
        }
      })
      .catch((error) => {
        console.log("mobile identification error"!);
        console.log({ error });

        toast({
          title: "Error",
          description: "Something went wrong, try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleMobileResendOTP = () => {
    setIsOTPResend(false);
    setStatus("pending");

    mobileResendOTP({ orderId: otpOrderId })
      .then(({ data }) => {
        console.log({ newOrderId: data?.orderId });
        if (data?.orderId) {
          setIsOTPResend(true);
          setOTPOrderId(data.orderId);
        }
      })
      .catch((error) => {
        console.log("couldn't resend mobile otp");
        console.log({ error });

        toast({
          title: "Error",
          description: "Something went wrong, try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleMobileVerifyOTP = ({ otp }: { otp: string }) => {
    setStatus("pending");

    mobileVerifyOTPAndAuthenticate({
      mobileNumber: identificationKey as string,
      orderId: otpOrderId,
      otp
    })
      .then(({ data: customer }) => {
        if (customer) {
          onLogin({
            customerId: customer._id as string,
            userName: customer.name || "User"
          });
        }
        setOTPOrderId("");

        toast({
          title: "Logged in",
          description: `Welcome ${identification === "registered" ? "back " : ""}${customer?.name?.split(" ")[0] || "User"}!`,
          variant: "success"
        });
      })
      .catch((error) => {
        console.log("mobile identification error"!);
        console.log({ error });

        toast({
          title: "Wrong OTP",
          description: "Look again on your phone.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  // whatsapp
  const handleWhatsappSendOTP = ({
    whatsappNumber
  }: {
    whatsappNumber: string;
  }) => {
    setStatus("pending");

    if (whatsappNumber !== identificationKey) {
      setIdentificationKey(whatsappNumber);
    }

    whatsappSendOTP({ whatsappNumber })
      .then(({ data }) => {
        setIsOTPSend(true);
        if (data?.identification) {
          setIdentification(data.identification);
        }
        if (data?.orderId) {
          setOTPOrderId(data.orderId);
        }
      })
      .catch((error) => {
        console.log("whatsapp identification error"!);
        console.log({ error });

        toast({
          title: "Error",
          description: "Something went wrong, try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleWhatsappResendOTP = () => {
    setIsOTPResend(false);
    setStatus("pending");

    whatsappResendOTP({ orderId: otpOrderId })
      .then(({ data }) => {
        console.log({ newOrderId: data?.orderId });
        if (data?.orderId) {
          setIsOTPResend(true);
          setOTPOrderId(data.orderId);
        }
      })
      .catch((error) => {
        console.log("couldn't resend whatsapp otp");
        console.log({ error });

        toast({
          title: "Error",
          description: "Something went wrong, try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  const handleWhatsappVerifyOTP = ({ otp }: { otp: string }) => {
    setStatus("pending");

    whatsappVerifyOTP({
      whatsappNumber: identificationKey as string,
      orderId: otpOrderId,
      otp
    })
      .then(({ data: customer }) => {
        if (customer) {
          onLogin({
            customerId: customer._id as string,
            userName: customer.name || "User"
          });
        }
        setOTPOrderId("");

        toast({
          title: "Logged in",
          description: `Welcome ${identification === "registered" ? "back " : ""}${customer?.name?.split(" ")[0] || "User"}!`,
          variant: "success"
        });
      })
      .catch((error) => {
        console.log("whatsapp identification error"!);
        console.log({ error });

        toast({
          title: "Error",
          description: "Look again on your whatsapp.",
          variant: "destructive"
        });
      })
      .finally(() => {
        setStatus("idle");
      });
  };

  // side effects
  useEffect(() => {
    if (auth) {
      setMethod(auth.default);
    }
  }, [auth]);

  useEffect(() => {
    setOTPOrderId("");
  }, [showAuth]);

  useEffect(() => {
    if (identification === "unidentified") {
      setOTPOrderId("");
    }
  }, [identification]);

  useEffect(() => {
    if (!otpOrderId) {
      setIsOTPSend(false);
      setIsOTPResend(false);
    }
  }, [otpOrderId]);

  return (
    <CustomerAuth.Provider
      value={{
        status,
        data: {
          method,
          identificationKey,
          identification,
          isOTPSend,
          isOTPResend
        },
        method: {
          onChangeMethod: setMethod,
          onChangeIdentificationKey: setIdentificationKey,
          onChangeIdentification: setIdentification,
          google: {
            onLogin: handleGoogleLogin
          },
          mail: {
            onIdentify: handleMailIdentify,
            onLogin: handleMailLogin,
            onRegister: handleMailRegister
          },
          mobile: {
            onSendOTP: handleMobileSendOTP,
            onResendOTP: handleMobileResendOTP,
            onVerifyOTP: handleMobileVerifyOTP
          },
          whatsapp: {
            onSendOTP: handleWhatsappSendOTP,
            onResendOTP: handleWhatsappResendOTP,
            onVerifyOTP: handleWhatsappVerifyOTP
          }
        }
      }}
    >
      {children}
    </CustomerAuth.Provider>
  );
}

// hook
export const useCustomerAuth = (): CustomerAuth => {
  const customerAuth = useContext(CustomerAuth);

  if (!customerAuth) {
    throw new Error(
      "useCustomerAuth must be used within a CustomerAuthProvider"
    );
  }

  return customerAuth;
};
