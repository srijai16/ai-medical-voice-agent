import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: 1,
});

redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export default redis;