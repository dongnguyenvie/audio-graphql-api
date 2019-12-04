import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    metaData: {
      type: Schema.Types.ObjectId,
      ref: 'MetaData'
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ]
  },
  {
    timestamps: false
  }
)

postSchema.plugin(mongoosePaginate)
export const post = mongoose.model('Post', postSchema)
