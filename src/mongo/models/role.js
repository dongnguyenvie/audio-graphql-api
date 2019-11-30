import mongoose, { Schema } from 'mongoose'

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    permission: {
      type: Number
    }
  },
  {
    timestamps: false
  }
)

export const role = mongoose.model('Role', roleSchema)
