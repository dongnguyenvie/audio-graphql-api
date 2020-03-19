import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const metaDataSchema = new mongoose.Schema(
  {
    jsonLD: {
      type: String
    },
    slug: {
      type: String,
      default: ''
    },
    view: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: true
    },
    like: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)

metaDataSchema.plugin(mongoosePaginate)
export const metaData = mongoose.model('MetaData', metaDataSchema)
