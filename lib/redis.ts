
import { createClient } from '@redis/client';

const redisClient = createClient({
  url: process.env.REDIS_URL, // Ensure REDIS_URL is set in your .env.local
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;