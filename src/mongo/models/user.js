import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'

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
    phone: {
      type: String
    },
    password: {
        type: String,
        required: true
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

export const user = mongoose.model('User', userSchema)
