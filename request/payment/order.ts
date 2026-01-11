// constants
import { DOMAIN } from "@/common/constants/domain";

import { XApiKey } from "@/common/constants/apiKey";
// types
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type OrderPaymentGatewayDocument } from "@/common/types/documentation/nestedDocuments/orderPaymentGateway";

export const getRazorpayOrderId = ({
  cartId
}: {
  cartId: string;
}): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}/api/payment/razorpay/order-id`;

      const response: Response = await fetch(url, {
        method: "POST",
        headers: { "x-api-key": XApiKey },
        body: JSON.stringify({
          cartId
        })
      });

      const responseData: {
        orderId: string | null;
      } = await response.json();

      if (response.ok) {
        console.log({ orderId: responseData.orderId })
        resolve(responseData.orderId);
      } else {
        reject(null);
      }
    } catch (error: any) {
      console.error("Error Getting OrderId", error);

      reject(null);
    }
  });
};

export const getPayUHash = ({
  cartId,
  txnid,
  productinfo,
  firstname,
  email
}: {
  cartId: string;
  txnid: string;
  productinfo: string;
  firstname: string;
  email: string;
}): Promise<string | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}/api/payment/payu/hash`;

      const response: Response = await fetch(url, {
        method: "POST",
        headers: { "x-api-key": XApiKey },
        body: JSON.stringify({
          cartId,
          txnid,
          productinfo,
          firstname,
          email
        })
      });

      const responseData: {
        hash: string | null;
      } = await response.json();

      if (response.ok) {
        resolve(responseData.hash);
      } else {
        reject(null);
      }
    } catch (error: any) {
      console.error("Error Getting Hash", error);

      reject(null);
    }
  });
};

export const generateOrder = ({
  orderData
}: {
  orderData: Partial<OrderDocument>;
}): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}/api/payment/order`;

      const response: Response = await fetch(url, {
        method: "POST",
        headers: { "x-api-key": XApiKey },
        body: JSON.stringify(orderData)
      });

      const responseData: boolean = await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Generating Order", error);

      reject(false);
    }
  });
};

export const updateOrder = ({
  orderId,
  gateway
}: {
  orderId: string;
  gateway: Partial<OrderPaymentGatewayDocument>;
}): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url: string = `${DOMAIN}/api/payment/retry-payment/${orderId}`;

      const response: Response = await fetch(url, {
        method: "PATCH",
        headers: { "x-api-key": XApiKey },
        body: JSON.stringify(gateway)
      });

      const responseData: boolean = await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      console.error("Error Updating Order", error);

      reject(false);
    }
  });
};
