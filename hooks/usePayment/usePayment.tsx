"use client";

// libraries
import { v4 as uuid } from "uuid";

// constants
import {
  DOMAIN,
  PAYU_KEY,
  RAZORPAY_KEY_ID
} from "@/common/constants/environmentVariables";

// requests
import {
  generateOrder,
  getPayUHash,
  getRazorpayOrderId,
  updateOrder
} from "@/request/payment/order";

// utils
import { createContext } from "react";
import { flattenObject } from "@/common/utils/flattenObject";

// hooks
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStates } from "../useAppState/useAppState";
import { useCustomerProfile } from "../useCustomerProfile";

// components
import OrderNotGenerated from "./components/OrderNotGeneratedDialog";
import Script from "next/script";

// types
import { type OrderPaymentDocument } from "@/common/types/documentation/nestedDocuments/orderPayment";
import { type OrderPaymentGatewayDocument } from "@/common/types/documentation/nestedDocuments/orderPaymentGateway";
import { type ReactNode } from "react";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { COMPANY_LOGO_URL, COMPANY_NAME } from "@/common/constants/companyDetails";

type Payment = {
  onInitiateNewPayment: ({
    gateway,
    cartId,
    amount,
    percentage
  }: {
    gateway: "razorpay" | "payu";
    cartId: string;
    amount: number;
    percentage: number;
  }) => void;
  onInitiateRetryPayment: ({
    gateway,
    orderId,
    cartId,
    amount,
    percentage
  }: {
    gateway: "razorpay" | "payu";
    orderId: string;
    cartId: string;
    amount: number;
    percentage: number;
  }) => void;
};

const Payment = createContext<Payment | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const {
    onOrder,
    profile: {
      data: { detail: customerDetail, cartId }
    }
  } = useAppStates();
  const {
    cart: { onDelete: onDeleteCart },
    order: { onChange: onChangeOrders }
  } = useCustomerProfile();

  // states
  const [mode, setMode] = useState<"initiate" | "retry">("initiate");
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // event handlers
  const handleInitiateNewPayment = ({
    gateway,
    cartId,
    amount,
    percentage
  }: {
    gateway: "razorpay" | "payu";
    cartId: string;
    amount: number;
    percentage: number;
  }) => {
    if (gateway === "razorpay") {
      displayRazorpay({
        mode: "initiate",
        cartId,
        amount,
        percentage
      });
    }

    if (gateway === "payu") {
      displayPayU({
        mode: "initiate",
        cartId,
        amount,
        percentage
      });
    }
  };

  const handleInitiateRetryPayment = ({
    gateway,
    cartId,
    orderId,
    amount,
    percentage
  }: {
    gateway: "razorpay" | "payu";
    cartId: string;
    orderId: string;
    amount: number;
    percentage: number;
  }) => {
    if (gateway === "razorpay") {
      displayRazorpay({
        mode: "retry",
        orderId,
        cartId,
        amount,
        percentage
      });
    }

    if (gateway === "payu") {
      displayPayU({
        mode: "retry",
        orderId,
        cartId,
        amount,
        percentage
      });
    }
  };

  const handleGenerateOrder = async ({
    status,
    amount,
    percentage,
    gateway,
    gatewayResponse
  }: {
    status: "pending" | "completed";
    amount: number;
    percentage: number;
    gateway: "razorpay" | "payu";
    gatewayResponse: Record<string, any>;
  }): Promise<void> => {
    await generateOrder({
      orderData: {
        payment: {
          status,
          amount,
          percentage,
          gateway: {
            name: gateway,
            info: gatewayResponse
          } as OrderPaymentGatewayDocument
        } as OrderPaymentDocument,
        cart: cartId as string,
        createdBy: customerDetail?.name || "User",
        updatedBy: customerDetail?.name || "User"
      }
    });
  };

  const handleUpdateOrder = async ({
    orderId,
    gateway,
    gatewayResponse
  }: {
    orderId: string;
    gateway: "razorpay" | "payu";
    gatewayResponse: Record<string, any>;
  }): Promise<void> => {
    await updateOrder({
      orderId,
      gateway: {
        name: gateway,
        info: gatewayResponse
      }
    });
  };

  // utils
  const displayRazorpay = async (
    params: { cartId: string; amount: number; percentage: number } & (
      | {
        mode: "initiate";
      }
      | {
        mode: "retry";
        orderId: string;
      }
    )
  ) => {
    const { mode, cartId, amount, percentage } = params;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: COMPANY_NAME,
      order_id: await getRazorpayOrderId({ cartId }),
      allow_rotation: true,
      image: COMPANY_LOGO_URL,
      theme: {
        color: "#b76e79"
      },
      prefill: {
        name: customerDetail?.name || "Guest",
        email: customerDetail?.mail || "",
        contact: customerDetail?.mobileNumber
          ? customerDetail?.mobileNumber.split("-").join("")
          : "+91-something"
      },
      modal: {
        backdropclose: true,
        confirm_close: true,
        ondismiss: () => { }
      },
      retry: {
        enabled: mode === "retry"
      },
      handler: async (gatewayResponse: Record<string, any>) => {
        console.log(gatewayResponse)
        if (mode === "initiate") {
          await handleGenerateOrder({
            status: "completed",
            amount,
            percentage,
            gateway: "razorpay",
            gatewayResponse
          })
            .then(() => {
              onOrder();
              onDeleteCart();
              push(FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ORDERS);
            })
            .catch(() => {
              onOrder();
              onDeleteCart();
              setMode("initiate");
              setPaymentSuccessful(true);
              setShowDialog(true);
            });
        }

        if (mode === "retry") {
          await handleUpdateOrder({
            orderId: params.orderId,
            gateway: "razorpay",
            gatewayResponse
          })
            .then(() => {
              onChangeOrders();
            })
            .catch(() => {
              setMode("retry");
              setPaymentSuccessful(true);
              setShowDialog(true);
            });
        }
      }
    };

    const paymentObject = new (window as any).Razorpay(options);

    if (mode === "initiate") {
      paymentObject.on(
        "payment.failed",
        async (gatewayResponse: Record<string, any>) => {
          await handleGenerateOrder({
            status: "pending",
            amount,
            percentage,
            gateway: "razorpay",
            gatewayResponse: flattenObject(gatewayResponse)
          })
            .then(() => {
              onOrder();
              onDeleteCart();
              push(FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ORDERS);
            })
            .catch(() => {
              onOrder();
              onDeleteCart();
              setMode("initiate");
              setPaymentSuccessful(false);
              setShowDialog(true);
            });
        }
      );
    }

    paymentObject.open();
  };

  const displayPayU = async (
    params: { cartId: string; amount: number; percentage: number } & (
      | {
        mode: "initiate";
      }
      | {
        mode: "retry";
        orderId: string;
      }
    )
  ) => {
    const { mode, cartId, amount, percentage } = params;

    const txnid = uuid();

    const hash = await getPayUHash({
      txnid,
      cartId,
      productinfo: COMPANY_NAME + " item",
      firstname: customerDetail?.name?.split(" ")[0] || "Guest",
      email: customerDetail?.mail || ""
    });

    const data = {
      key: PAYU_KEY,
      hash,
      txnid,
      amount: `${amount}`,
      firstname: customerDetail?.name?.split(" ")[0] || "Guest",
      lastname: customerDetail?.name?.split(" ")[1] || "",
      email: customerDetail?.mail || "",
      phone: customerDetail?.mobileNumber
        ? customerDetail?.mobileNumber.split("-").join("")
        : "+91-something",
      productinfo: COMPANY_NAME + " product",
      surl: `${DOMAIN}${FRONTEND_LINKS.DASHBOARD}${FRONTEND_LINKS.DASHBOARD_ORDERS}`,
      furl: `${DOMAIN}${FRONTEND_LINKS.DASHBOARD}${FRONTEND_LINKS.DASHBOARD_ORDERS}`,
      display_lang: "English"
    };

    const handlers = {
      responseHandler: async (gatewayResponse: Record<string, any>) => {
        if (gatewayResponse.response.txnStatus == "SUCCESS") {
          if (mode === "initiate") {
            await handleGenerateOrder({
              status: "completed",
              amount,
              percentage,
              gateway: "razorpay",
              gatewayResponse: flattenObject(gatewayResponse.response)
            })
              .then(() => {
                onOrder();
                onDeleteCart();
                push(FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ORDERS);
              })
              .catch(() => {
                onOrder();
                onDeleteCart();
                setMode("initiate");
                setPaymentSuccessful(true);
                setShowDialog(true);
              });
          }

          if (mode === "retry") {
            await handleUpdateOrder({
              orderId: params.orderId,
              gateway: "razorpay",
              gatewayResponse: flattenObject(gatewayResponse.response)
            })
              .then(() => {
                onChangeOrders();
              })
              .catch(() => {
                setMode("retry");
                setPaymentSuccessful(true);
                setShowDialog(true);
              });
          }
        }

        if (gatewayResponse.response.txnStatus == "FAILED") {
          if (mode === "initiate") {
            await handleGenerateOrder({
              status: "pending",
              amount,
              percentage,
              gateway: "payu",
              gatewayResponse: flattenObject(gatewayResponse.response)
            })
              .then(() => {
                onOrder();
                onDeleteCart();
                push(FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ORDERS);
              })
              .catch(() => {
                onOrder();
                onDeleteCart();
                setMode("initiate");
                setPaymentSuccessful(false);
                setShowDialog(true);
              });
          }
        }
      },
      catchException: async (gatewayResponse: Record<string, any>) => {
        if (mode === "initiate") {
          await handleGenerateOrder({
            status: "pending",
            amount,
            percentage,
            gateway: "payu",
            gatewayResponse: flattenObject(gatewayResponse)
          })
            .then(() => {
              onOrder();
              onDeleteCart();
              push(FRONTEND_LINKS.DASHBOARD + FRONTEND_LINKS.DASHBOARD_ORDERS);
            })
            .catch(() => {
              onOrder();
              onDeleteCart();
              setMode("initiate");
              setPaymentSuccessful(false);
              setShowDialog(true);
            });
        }
      }
    };

    const paymentObject = (window as any).bolt;

    paymentObject.launch(data, handlers);
  };

  return (
    <Payment.Provider
      value={{
        onInitiateNewPayment: handleInitiateNewPayment,
        onInitiateRetryPayment: handleInitiateRetryPayment
      }}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Script src="https://jssdk.payu.in/bolt/bolt.min.js" />
      {children}
      <OrderNotGenerated
        mode={mode}
        paymentSuccessful={paymentSuccessful}
        showDialog={showDialog}
        onChangeShowDialog={setShowDialog}
      />
    </Payment.Provider>
  );
}

export const usePayment = (): Payment => {
  const payment = useContext(Payment);

  if (!payment) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }

  return payment;
};
