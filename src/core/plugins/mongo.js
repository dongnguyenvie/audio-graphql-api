import mongoose from 'mongoose'
import config from '../../../config'
import DatabaseSeeder from '../../core/models/seed'

mongoose
  .connect(config.MONGO_URI || 'mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(async response => {
    new DatabaseSeeder()
    console.log(`db connected success`)
  })
  .catch(err => {
    console.log(`db connected faild`)
  })

mongoose.Promise = global.Promise

export default mongoose.connection
