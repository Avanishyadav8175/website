import { DOMAIN } from "@/common/constants/domain";

// types
import { XApiKey } from "@/common/constants/apiKey";
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";

// Request cache to prevent duplicate calls
const requestCache = new Map<string, Promise<ResponseDataType<CartDocument>>>();
const CACHE_TTL = 30 * 1000; // 30 seconds

// Cleanup cache periodically
setInterval(() => {
  requestCache.clear();
}, CACHE_TTL);

export const addCartOptimized = (cart: CartDocument): Promise<ResponseDataType<CartDocument>> => {
  const cacheKey = `add-${cart._id}`;

  // Return cached promise if exists
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  const promise = new Promise<ResponseDataType<CartDocument>>(
    async (resolve, reject) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response: Response = await fetch(`${DOMAIN}/api/frontend/cart`, {
          method: "POST",
          headers: {
            "x-api-key": XApiKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cart),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: ResponseDataType<CartDocument> = await response.json();

        if (responseData.data) {
          resolve(responseData);
        } else {
          reject(new Error("Failed to add cart"));
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          reject(new Error("Request timeout"));
        } else {
          reject(error);
        }
      } finally {
        // Remove from cache after completion
        setTimeout(() => requestCache.delete(cacheKey), 1000);
      }
    }
  );

  requestCache.set(cacheKey, promise);
  return promise;
};

export const fetchCartOptimized = (cartId: string): Promise<ResponseDataType<CartDocument>> => {
  const cacheKey = `fetch-${cartId}`;

  // Return cached promise if exists
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  const promise = new Promise<ResponseDataType<CartDocument>>(
    async (resolve, reject) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/cart/${cartId}`,
          {
            headers: {
              "x-api-key": XApiKey,
              "Cache-Control": "no-cache"
            },
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 404) {
            resolve({
              data: null,
              count: 0,
              statusCode: 404,
              messages: []
            } as any);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: ResponseDataType<CartDocument> = await response.json();

        if (responseData.data) {
          resolve(responseData);
        } else {
          reject(new Error("Failed to fetch cart"));
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          reject(new Error("Request timeout"));
        } else {
          reject(error);
        }
      } finally {
        // Remove from cache after completion
        setTimeout(() => requestCache.delete(cacheKey), 1000);
      }
    }
  );

  requestCache.set(cacheKey, promise);
  return promise;
};

export const updateCartOptimized = (
  cartId: string,
  cart: CartDocument
): Promise<ResponseDataType<CartDocument>> => {
  const cacheKey = `update-${cartId}-${Date.now()}`;

  const promise = new Promise<ResponseDataType<CartDocument>>(
    async (resolve, reject) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/cart/${cartId}`,
          {
            method: "PATCH",
            headers: {
              "x-api-key": XApiKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(cart),
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: ResponseDataType<CartDocument> = await response.json();

        if (responseData.data) {
          resolve(responseData);
        } else {
          reject(new Error("Failed to update cart"));
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          reject(new Error("Request timeout"));
        } else {
          reject(error);
        }
      }
    }
  );

  return promise;
};

// Batch operations for multiple cart items
export const batchCartOperations = async (
  operations: Array<{
    type: 'add' | 'update' | 'fetch';
    cartId?: string;
    cart?: CartDocument;
  }>
): Promise<ResponseDataType<CartDocument>[]> => {
  const promises = operations.map(op => {
    switch (op.type) {
      case 'add':
        return addCartOptimized(op.cart!);
      case 'update':
        return updateCartOptimized(op.cartId!, op.cart!);
      case 'fetch':
        return fetchCartOptimized(op.cartId!);
      default:
        return Promise.reject(new Error('Invalid operation type'));
    }
  });

  try {
    return await Promise.all(promises);
  } catch (error) {
    console.error('Batch cart operations failed:', error);
    throw error;
  }
};