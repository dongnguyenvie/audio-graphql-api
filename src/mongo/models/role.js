import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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
    timestamps: true
  }
)

roleSchema.plugin(mongoosePaginate)
export const role = mongoose.model('Role', roleSchema)
