import redis from 'redis'
import config from '../../../config'

const _HOST = config.HOST

const client = redis.createClient({
  port: 6379,
  host: _HOST,
  // auth: 'password',
  db: 2 // if provided select a non-default redis db
})

export default client
