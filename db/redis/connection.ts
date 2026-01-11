// libraries
import { createClient } from "redis";

// types
import { type RedisClientType } from "redis";

// env variables
const url: string | undefined = process.env.REDIS_URL;
const password: string | undefined = process.env.REDIS_PASSWORD;

if (!url) {
  throw new Error("Please add your REDIS_URL to .env");
}

if (!password) {
  throw new Error("Please add your REDIS_PASSWORD to .env");
}

const redisClient: RedisClientType = createClient({ url, password });

export const connectRedis = async (): Promise<RedisClientType> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
};
