import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const metaDataSchema = new mongoose.Schema(
  {
    jsonLd: {
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
      type: Number
    },
    status: {
      type: Boolean,
      default: true
    },
    like: {
      type: Boolean,
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
