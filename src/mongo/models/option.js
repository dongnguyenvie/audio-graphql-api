import mongoose, { Schema } from 'mongoose'

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
    timestamps: false
  }
)

export const option = mongoose.model('Option', optionSchema)
