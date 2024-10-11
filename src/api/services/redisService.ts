import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL);

export const redis = {
  get: (key: string) => redisClient.get(key),
  set: (key: string, value: string, mode?: string, duration?: number) => {
    if (mode === 'EX') {
      return redisClient.set(key, value, 'EX', duration);
    }
    return redisClient.set(key, value);
  },
  del: (key: string) => redisClient.del(key),
  flushall: () => redisClient.flushall(),
};