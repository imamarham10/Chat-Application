import Redis from 'ioredis';
import config from '../../config';

const redisOptions = {
    port: Number(config.REDIS_PORT),
    host: config.REDIS_HOST,
    password: config.REDIS_PASSWORD,
    tls: {rejectUnauthorized: false},
  };
const pub = new Redis(redisOptions);
const sub = new Redis(redisOptions);

const callbacks: Record<string, ((msg: any) => void)[]> = {};

export const subscribeToRoom = (roomId: string, callback: (msg: any) => void) => {
  if (!callbacks[roomId]) {
    callbacks[roomId] = [];
    sub.subscribe(roomId);
  }
  callbacks[roomId].push(callback);
};

sub.on('message', (channel, message) => {
  const parsed = JSON.parse(message);
  if (callbacks[channel]) {
    for (const cb of callbacks[channel]) cb(parsed);
  }
});

export const publishMessageToRoom = (roomId: string, message: any) => {
  return pub.publish(roomId, JSON.stringify(message));
};
