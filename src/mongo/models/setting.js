import mongoose, { Schema } from 'mongoose'

const settingSchema = new mongoose.Schema(
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
    option: {
      type: String,
      default: ''
    },
    default: {
      type: String,
      default: ''
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

export const setting = mongoose.model('Setting', settingSchema)
