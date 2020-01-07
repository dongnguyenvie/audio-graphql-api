import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
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

blogSchema.plugin(mongoosePaginate)
export const blog = mongoose.model('Blog', blogSchema)
