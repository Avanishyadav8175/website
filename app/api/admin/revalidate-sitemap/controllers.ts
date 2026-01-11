// libraries
import { cloudfront } from "@/lib/aws";
import { del as clearRedis } from "@/db/redis/methods";

// types
import { type RevalidateImageCache } from "@/common/types/revalidateCache";

export const clearCache = async ({
  redisKeys,
  cloudfrontPath
}: {
  redisKeys: string[];
  cloudfrontPath: string;
}): Promise<RevalidateImageCache> => {
  try {
    const isRedisCleared = await clearRedis({ keys: redisKeys });

    const isCloudfrontCleared = await cloudfront.cache.clear({
      path: cloudfrontPath
    });

    return {
      redis: isRedisCleared,
      cloudfront: isCloudfrontCleared
    };
  } catch {
    return {
      redis: false,
      cloudfront: false
    };
  }
};
