// DB connection
import connectDB from "@/db/mongoose/connection";

// models
import MODELS from "@/db/mongoose/models";
const { Carts } = MODELS;

// types

export const updateCartItemStatus = async ({
  cartId,
  cartItemId,
  updatedStatus
}: {
  cartId: string;
  cartItemId: string;
  updatedStatus: "new" | "preparing" | "on-the-way" | "completed" | "cancelled";
}): Promise<boolean> => {
  await connectDB();

  const cart = await Carts.findOneAndUpdate(
    {
      _id: cartId,
      "items._id": cartItemId
    },
    {
      $set: { "items.$.status": updatedStatus }
    }
  );

  return Boolean(cart);
};
