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
      required: ''
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    metaData: {
      type: Schema.Types.ObjectId,
      ref: 'MetaData'
    }
  },
  {
    timestamps: false
  }
)

blogSchema.plugin(mongoosePaginate)
export const blog = mongoose.model('Blog', blogSchema)
