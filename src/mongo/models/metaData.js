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
      type: Number
    },
    order: {
      type: Number
    },
    status: {
      type: Boolean,
      default: true
    },
    tags: {
      type: Array,
      default: []
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

metaDataSchema.plugin(mongoosePaginate)
export const metaData = mongoose.model('MetaData', metaDataSchema)
