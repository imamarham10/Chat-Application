import { createClient } from 'redis';
import config from '../../config';

const redisClient = createClient({
  url: `rediss://default:${config.REDIS_PASSWORD}@${config.REDIS_HOST}:${config.REDIS_PORT}`,
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

let isRedisConnected = false;

const connectRedis = async () => {
  if (!isRedisConnected) {
    await redisClient.connect();
    isRedisConnected = true;
  }
};

export { redisClient, connectRedis };
