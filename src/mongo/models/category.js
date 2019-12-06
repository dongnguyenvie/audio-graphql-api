import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    metaData: {
      type: Schema.Types.ObjectId,
      ref: 'MetaData'
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: false
  }
)

categorySchema.plugin(mongoosePaginate)
export const category = mongoose.model('Category', categorySchema)
