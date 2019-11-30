import mongoose, { Schema } from 'mongoose'

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
    }
  },
  {
    timestamps: false
  }
)

export const category = mongoose.model('Category', categorySchema)
