import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: ''
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: false
  }
)

commentSchema.plugin(mongoosePaginate)
export const comment = mongoose.model('Comment', commentSchema)
