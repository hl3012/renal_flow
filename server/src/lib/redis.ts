import Redis from 'ioredis';
import dotenv from "dotenv";

dotenv.config();
const redisUrl = process.env.UPSTASH_REDIS_URL;
console.log(redisUrl);

if (!redisUrl) {
  throw new Error("UPSTASH_REDIS_URL is not defined in .env");
}

export const redis = new Redis(redisUrl, {
  tls: {}
});