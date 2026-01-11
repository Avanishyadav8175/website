import { ALL_CACHE_KEY } from "@/common/constants/cacheKeys";
import { flush } from "@/db/redis/methods";
import { cloudfront } from "@/lib/aws";
import { revalidateTag } from "next/cache";

export const resetAllCache = async (): Promise<boolean> => {
  try {
    // Clear Redis cache
    await flush();

    // Revalidate Next.js cache
    revalidateTag(ALL_CACHE_KEY);

    // Clear Cloudfront cache (if configured)
    try {
      await cloudfront.cache.clear({ path: "/*" });
    } catch (cloudfrontError) {
      console.warn("Cloudfront cache clear failed (may not be configured):", cloudfrontError);
    }

    return true;
  }
  catch (error) {
    console.error("Error resetting all cache:", error);
    return false;
  }
};

export const resetRedisCache = async (): Promise<boolean> => {
  try {
    const isRedisReset = await flush();
    return isRedisReset;
  }
  catch {
    return false;
  }
};

export const resetNextCache = async (): Promise<boolean> => {
  try {
    revalidateTag(ALL_CACHE_KEY);
    return true;
  }
  catch {
    return false;
  }
};

export const resetCloudfrontCache = async (): Promise<boolean> => {
  try {
    const isCloudfrontReset = await cloudfront.cache.clear({ path: "/*" });
    return isCloudfrontReset;
  }
  catch {
    return false;
  }
};
