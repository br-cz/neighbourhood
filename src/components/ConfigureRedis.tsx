import { Redis } from '@upstash/redis';

const getRedisObject = () => {
    if (process.env.NEXT_PUBLIC_REDIS_TOKEN) {
        return {
            url: 'https://us1-brief-slug-40540.upstash.io',
            token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
        };
    }
    throw new Error('REDIS_TOKEN not found');
};

export const redis = new Redis(getRedisObject());
