// libraries
import moment from "moment";

// DB connection
import connectDB from "@/db/mongoose/connection";

// models
import MODELS from "@/db/mongoose/models";
const { Customers, Carts, Orders } = MODELS;

// types
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type OrderPaymentGatewayDocument } from "@/common/types/documentation/nestedDocuments/orderPaymentGateway";

const generateOrderId = (): string => `FW${moment().format("YYMMDDHHmmss")}`;

export const generateOrder = async (
  orderData: Partial<OrderDocument>
): Promise<boolean> => {
  // create new session
  // await connectDB();
  // const session = await (await connectDB()).startSession();

  let isOrderGenerated = false;
  let attemptCount = 1;

  const { payment, cart: cartId, createdBy, updatedBy } = orderData;

  while (isOrderGenerated === false && attemptCount <= 10) {
    try {
      // DB query
      // await session.withTransaction(async () => {
      const cart = await Carts.findByIdAndUpdate(
        cartId as string,
        {
          isOrdered: true
        },
        {
          new: true,
          // session
        }
      );

      const newOrder = new Orders({
        id: generateOrderId(),
        payment,
        cart,
        createdBy,
        updatedBy
      });

      // const order = await newOrder.save({
      //   session
      // });

      const order = await newOrder.save();

      const customer = await Customers.findByIdAndUpdate(
        cart?.customer as string,
        {
          $unset: {
            cart: 1
          },
          $push: {
            orders: order._id
          }
        },
        {
          new: true,
          // session
        }
      );

      // await session.commitTransaction();

      isOrderGenerated = true;
      // });
    } catch (error: any) {
      console.error(
        `Error Generating Order:
${error.message}`
      );

      attemptCount += 1;
    }
  }

  // session.endSession();

  if (!isOrderGenerated) {
    console.log(`
[!IMPORTANT]
Order couldn't be created for a payment
payment status -> ${payment?.status},
payment gateway -> ${payment?.gateway?.name},
payment gateway response -> ${JSON.stringify(payment?.gateway?.info || "")},
payment percentage -> ${payment?.percentage},
payment amount -> ${payment?.amount},
cart id -> ${cartId},
customer id -> ${""}
`);
  }

  return isOrderGenerated;
};

export const updateOrder = async (
  orderId: string,
  gateway: Partial<OrderPaymentGatewayDocument>
): Promise<boolean> => {
  // create new session
  await connectDB();
  // const session = await (await connectDB()).startSession();

  let isOrderUpdated = false;
  // let attemptCount = 1;

  // while (isOrderUpdated === false && attemptCount <= 5) {
  try {
    // DB query
    // await session.withTransaction(async () => {
    const order = await Orders.findByIdAndUpdate(
      orderId,
      {
        "payment.status": "completed",
        "payment.gateway": gateway
      },
      {
        new: true
        // session
      }
    );

    // await session.commitTransaction();

    isOrderUpdated = true;
    // });
  } catch (error: any) {
    console.error(
      `Error Updating Order:
  ${error.message}`
    );

    // attemptCount += 1;
    // }
  }

  // session.endSession();

  if (!isOrderUpdated) {
    console.log(`
  [!IMPORTANT]
  Order couldn't be updated for a payment
  order id -> ${orderId},
  payment status -> success,
  payment gateway -> ${gateway?.name},
  payment gateway response -> ${JSON.stringify(gateway?.info || "")}
  `);
  }

  return isOrderUpdated;
};
