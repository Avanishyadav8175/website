import { connectRedis } from "./connection";

export const set = async <T>({
  key,
  value
}: {
  key: string;
  value: T;
}): Promise<boolean> => {
  try {
    const redisClient = await connectRedis();

    const stringifiedValue = JSON.stringify(value);

    const response = await redisClient.set(key, stringifiedValue);

    return response === "OK";
  } catch (error: any) {
    console.warn("Redis set operation failed:", error?.message || error);
    return false;
  }
};

export const get = async <T>({ key }: { key: string }): Promise<T | null> => {
  try {
    const redisClient = await connectRedis();

    const value = await redisClient.get(key);

    if (!value) {
      return null;
    }

    const parsedValue = JSON.parse(value) as T;

    return parsedValue;
  } catch (error: any) {
    console.warn("Redis get operation failed:", error?.message || error);
    return null;
  }
};

export const del = async ({ keys }: { keys: string[] }): Promise<boolean> => {
  const redisClient = await connectRedis();

  const response = await redisClient.del(keys);

  return Boolean(response);
};

// export const delMany = async ({
//   prefix
// }: {
//   prefix: string;
// }): Promise<boolean> => {
//   const redisClient = await connectRedis();
//   let cursor = 0;
//   let deletedCount = 0;

//   do {
//     const result = await redisClient.scan(cursor, {
//       MATCH: `${prefix}*`,
//       COUNT: 100
//     });

//     cursor = result.cursor;
//     const keys = result.keys;

//     if (keys.length > 0) {
//       const response = await redisClient.del(keys);
//       deletedCount += response;
//     }
//   } while (cursor);

//   return deletedCount > 0;
// };

export const flush = async (): Promise<boolean> => {
  const redisClient = await connectRedis();

  const response = await redisClient.flushAll();

  return response === "OK";
};
