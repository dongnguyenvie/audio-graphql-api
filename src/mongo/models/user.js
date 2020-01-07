import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String
      // required: true
    },
    avatar: {
      type: String
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, 12)
  this.password = hashedPassword
})
userSchema.plugin(mongoosePaginate)

export const user = mongoose.model('User', userSchema)
