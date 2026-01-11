// next config
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// controllers
import { getCartOptimized, updateCartOptimized } from "../optimized-controller";

// constants
import {
  badRequestErrorResponse,
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { successData } from "@/common/utils/api/data";
import { Response } from "@/common/utils/api/next";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type NextRequest } from "next/server";

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
};

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<APIResponseType<CartDocument>> => {
  try {
    // Rate limiting
    const clientIP = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`${clientIP}-${id}`)) {
      return Response<null>({
        success: false,
        message: "Too many requests",
        statusCode: 429
      } as any);
    }

    // Validate cart ID format
    if (!id || id.length !== 24) {
      return Response<CartDocument>(badRequestErrorResponse);
    }

    const cart = await getCartOptimized({ id });

    if (!cart) {
      return Response<CartDocument>(notFoundErrorResponse);
    }

    // Set cache headers for better performance
    const response = Response(successData(cart));
    response.headers.set('Cache-Control', 'private, max-age=60'); // Cache for 1 minute

    return response;
  } catch (error: any) {
    console.error("Cart GET Error:", error);
    return Response<null>(serverErrorResponse);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<APIResponseType<CartDocument>> => {
  try {
    // Rate limiting
    const clientIP = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`${clientIP}-${id}-update`)) {
      return Response<null>({
        success: false,
        message: "Too many requests",
        statusCode: 429
      } as any);
    }

    // Validate cart ID format
    if (!id || id.length !== 24) {
      return Response<CartDocument>(badRequestErrorResponse);
    }

    let cart: CartDocument;
    try {
      cart = await req.json() as CartDocument;
    } catch (parseError) {
      return Response<CartDocument>(badRequestErrorResponse);
    }

    // Basic validation
    if (!cart || typeof cart !== 'object') {
      return Response<CartDocument>(badRequestErrorResponse);
    }

    const document = await updateCartOptimized({ id, cart });

    if (!document) {
      return Response<CartDocument>(notFoundErrorResponse);
    }

    return Response(successData(document));
  } catch (error: any) {
    console.error("Cart PATCH Error:", error);
    return Response<null>(serverErrorResponse);
  }
};

// Cleanup rate limit map periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);