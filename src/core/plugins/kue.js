import kue from 'kue';

const queue = kue.createQueue({
    redis: {
        port: 6379,
        host: '192.168.93.79',
        // auth: 'password',
        db: 1, // if provided select a non-default redis db
        options: {
          // see https://github.com/mranney/node_redis#rediscreateclient
        }
    }
});

export default queue;