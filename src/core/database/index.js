import mongoose from 'mongoose'
import config from '../../../config'

mongoose.connect(config.MONGO_URL || 'mongodb://localhost:27017/graphql')

mongoose.Promise = global.Promise;

export default mongoose.connection