import mongoose, { Schema } from 'mongoose'

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
    categories : [
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

export const post = mongoose.model('Post', postSchema)
