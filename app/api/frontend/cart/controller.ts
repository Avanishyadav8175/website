// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Carts } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { isDateExpired } from "./utils/isDateExpired";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { fetchContentPageData } from "@/request/content/contentPageData";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";

// constants
const SELECT = {
  cart: ["isOrdered", "customer", "items", "price", "checkout", "coupon"],
  content: [
    "name",
    "slug",
    "category",
    "media.video",
    "availability",
    "detail.includes",
    "detail.excludes",
    "quality",
    "delivery",
    "price",
    "edible",
    "customization",
    "addons",
    "variants"
  ],
  image: ["alt", "defaultAlt", "url"]
};

export const addCart = async ({
  cart
}: {
  cart: CartDocument;
}): Promise<CartDocument | null> => {
  try {
    await connectDB();

    const newDocument = new Carts(cart);

    const document = await newDocument.save();

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(JSON.stringify(handleError(error as MongooseErrorType)));

    return null;
  }
};

export const getCart = async ({
  id
}: {
  id: string;
}): Promise<CartDocument | null> => {
  try {
    await connectDB();

    const document = await Carts.findOne({ _id: id, isOrdered: false })
      .select(SELECT.cart)
      .populate([
        {
          path: "items.content",
          select: ["slug"]
        },
        { path: "items.delivery.type", strictPopulate: false },
        { path: "items.addons.addon", strictPopulate: false },
        {
          path: "items.customization.enhancement.items.enhancement",
          strictPopulate: false
        },
        {
          path: "items.customization.upgrade.upgrade",
          strictPopulate: false
        },
        {
          path: "items.customization.flavour.flavour",
          strictPopulate: false
        },
        { path: "coupon", strictPopulate: false }
      ]);

    if (!document) {
      return null;
    }

    const docObj = document.toObject() as CartDocument;

    const validItems = [...docObj.items]
      .filter(({ delivery }) => !isDateExpired(delivery?.date || ""))
      .map((item) => {
        const validItem = { ...item } as CartItemDocument;

        if (validItem.delivery.type) {
          validItem.delivery.slot = (
            validItem.delivery.type as DeliveryTypeDocument
          ).timeSlots.find(
            ({ _id }) => String(_id) === String(validItem.delivery.slot)
          );
        }

        return validItem;
      });

    const promises = validItems.map(({ content }) =>
      fetchContentPageData((content as ContentDocument).slug)
    );

    const responses = await Promise.all(promises);
    const contents = responses.map(({ data }) => data as ContentDocument);

    const PopulatedItems = validItems.map((item, i) => {
      const populatedItem = { ...item } as CartItemDocument;

      populatedItem.content = contents[i];

      return populatedItem;
    });

    docObj.items = PopulatedItems;

    return docObj;
  } catch (error: any) {
    console.error(handleError(error as MongooseErrorType));

    return null;
  }
};

export const updateCart = async ({
  id,
  cart
}: {
  id: string;
  cart: CartDocument;
}): Promise<CartDocument | null> => {
  try {
    await connectDB();

    const document = await Carts.findOneAndUpdate(
      {
        _id: id,
        isOrdered: false
      },
      cart as Partial<CartDocument>,
      {
        new: true
      }
    );

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error(JSON.stringify(handleError(error as MongooseErrorType)));

    return null;
  }
};
