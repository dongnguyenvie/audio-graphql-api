import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'

export default {
  Query: {
    user: async (parent, { id }, { models, me }, info) => {
      const user = await models.user.findById({ _id: id }).exec()
      return user
    },
    login: async (parent, { name, password }, { models, req }, info) => {
      const user = await models.user.findOne({ name }).exec()

      if (!user) {
        throw new AuthenticationError('Invalid credentials')
      }

      const matchPasswords = bcrypt.compareSync(password, user.password)

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials')
      }
      req.session.user = user;
      const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 })
      return {
        token
      }
    },
    isLogin: async (parent, _, { models, me, req }, info) => {
      return me
    }
  },
  Mutation: {
    createUser: async (parent, { name, password }, { models }, info) => {
      const user = await models.user.create({ name, password })
      return user
    }
  }
}
