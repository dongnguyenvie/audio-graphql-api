import mongoose from 'mongoose'
import config from '../../../config'
import initSeedData from '../../mongo/seed'

mongoose
  .connect(config.MONGO_URL || 'mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(async response => {
    await initSeedData()
    console.log(`db connected success`)
  })
  .catch(err => {
    console.log(`db connected faild`)
  })

mongoose.Promise = global.Promise

export default mongoose.connection
