import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'

export default {
  Query: {
    getUser: async (parent, args, ctx, info) => {
      return ctrs.user.getUser(parent, ctx.models.user, args)
    }
    // login: async (parent, { name, password }, { models, req }, info) => {
    //   const user = await models.user.findOne({ name }).exec()

    //   if (!user) {
    //     throw new AuthenticationError('Invalid credentials')
    //   }

    //   const matchPasswords = bcrypt.compareSync(password, user.password)

    //   if (!matchPasswords) {
    //     throw new AuthenticationError('Invalid credentials')
    //   }
    //   req.session.user = user;
    //   const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 })
    //   return {
    //     token
    //   }
    // },
    // isLogin: async (parent, _, { models, me, req }, info) => {
    //   return me
    // }
  },
  Mutation: {
    createUser: async (parent, args, { models }, info) => {
      return ctrs.user.createUser(models.user, args)
    }
  }
}
