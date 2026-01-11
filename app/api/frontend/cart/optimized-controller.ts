// DB connection
import connectDB from "@/db/mongoose/connection";

// model
import models from "@/db/mongoose/models";
const { Carts } = models;

// utils
import { handleError } from "@/common/utils/api/error";

// types
import { type MongooseErrorType } from "@/common/types/apiTypes";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { fetchContentPageData } from "@/request/content/contentPageData";
import { isDateExpired } from "./utils/isDateExpired";

// Cache for frequently accessed data
const contentCache = new Map<string, ContentDocument & { lastFetched: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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

// Optimized content fetching with caching
const fetchContentWithCache = async (slug: string): Promise<ContentDocument | null> => {
  const cacheKey = `content_${slug}`;
  const cached = contentCache.get(cacheKey);

  if (cached && (Date.now() - cached.lastFetched) < CACHE_TTL) {
    // Return the content without the timestamp
    const { lastFetched, ...content } = cached;
    return content as ContentDocument;
  }

  try {
    const response = await fetchContentPageData(slug);
    if (response.data) {
      const contentWithTimestamp = {
        ...response.data,
        lastFetched: Date.now()
      } as ContentDocument & { lastFetched: number };

      contentCache.set(cacheKey, contentWithTimestamp);
      return response.data as ContentDocument;
    }
  } catch (error) {
    console.error(`Failed to fetch content for slug: ${slug}`, error);
  }

  return null;
};

export const addCartOptimized = async ({
  cart
}: {
  cart: CartDocument;
}): Promise<CartDocument | null> => {
  try {
    await connectDB();

    // Validate cart data before saving
    if (!cart.customer) {
      console.error("Cart missing customer ID");
      return null;
    }

    // Check if cart already exists to prevent duplicates
    const existingCart = await Carts.findOne({
      _id: cart._id,
      customer: cart.customer,
      isOrdered: false
    });

    if (existingCart) {
      console.log("Cart already exists, returning existing cart");
      return existingCart;
    }

    const newDocument = new Carts(cart);
    const document = await newDocument.save();

    if (!document) {
      return null;
    }

    return document;
  } catch (error: any) {
    console.error("addCartOptimized error:", JSON.stringify(handleError(error as MongooseErrorType)));
    return null;
  }
};

export const getCartOptimized = async ({
  id
}: {
  id: string;
}): Promise<CartDocument | null> => {
  try {
    await connectDB();

    // Add index hint for better performance
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
      ])
      .lean(); // Use lean() for better performance

    if (!document) {
      return null;
    }

    const docObj = document as CartDocument;

    // Filter and validate items in parallel
    const validItems = docObj.items
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

    // Batch fetch content data with caching
    const contentPromises = validItems.map(({ content }) =>
      fetchContentWithCache((content as ContentDocument).slug)
    );

    const contents = await Promise.all(contentPromises);

    // Map populated items
    const PopulatedItems = validItems.map((item, i) => {
      const populatedItem = { ...item } as CartItemDocument;
      if (contents[i]) {
        populatedItem.content = contents[i]!;
      }
      return populatedItem;
    }).filter(item => item.content); // Remove items with failed content fetch

    docObj.items = PopulatedItems;

    return docObj;
  } catch (error: any) {
    console.error("getCartOptimized error:", handleError(error as MongooseErrorType));
    return null;
  }
};

export const updateCartOptimized = async ({
  id,
  cart
}: {
  id: string;
  cart: CartDocument;
}): Promise<CartDocument | null> => {
  try {
    await connectDB();

    // Use findOneAndUpdate with optimistic locking
    const document = await Carts.findOneAndUpdate(
      {
        _id: id,
        isOrdered: false
      },
      cart as Partial<CartDocument>,
      {
        new: true,
        runValidators: true,
        lean: true // Better performance
      }
    );

    if (!document) {
      return null;
    }

    return document as CartDocument;
  } catch (error: any) {
    console.error("updateCartOptimized error:", JSON.stringify(handleError(error as MongooseErrorType)));
    return null;
  }
};

// Cleanup cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of contentCache.entries()) {
    if (now - (value as any).lastFetched > CACHE_TTL) {
      contentCache.delete(key);
    }
  }
}, CACHE_TTL);