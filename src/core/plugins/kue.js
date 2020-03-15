import kue from 'kue'
import config from '../../../config'

const _HOST = config.HOST

const queue = kue.createQueue({
  redis: {
    port: 6379,
    host: _HOST,
    // auth: 'password',
    db: 1, // if provided select a non-default redis db
    options: {
      // see https://github.com/mranney/node_redis#rediscreateclient
    }
  }
})

export default queue
