import mongoose, { Schema } from 'mongoose'

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
    }
  },
  {
    timestamps: true
  }
)

export const metaData = mongoose.model('MetaData', metaDataSchema)
