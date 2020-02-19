import redis from 'redis';

const client = redis.createClient({
    port: 6379,
    host: '192.168.93.79',
    // auth: 'password',
    db: 2, // if provided select a non-default redis db
});

export default client;