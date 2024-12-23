import Redis from "ioredis";
import logger from "./logger.js";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

redisClient.on("error", (err) => {
  logger.error(`Redis error: ${err}`);
});

redisClient.ping((err, result) => {
  if (err) {
    logger.error("Error with PING:", err);
  } else {
    logger.info("PING result: " + result);
  }
});

export { redisClient };
