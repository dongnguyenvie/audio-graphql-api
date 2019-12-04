import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const optionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    value: {
      type: String,
      default: ''
    },
    orthers: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

optionSchema.plugin(mongoosePaginate)
export const option = mongoose.model('Option', optionSchema)
