import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import graphqlFields from 'graphql-fields'
import helper from '../../../core/common/helper'

export default {
  Query: {
    getRole: async (parent, { role: args }, { models, me }, info) => {
      const projection = helper.getProjection(info)
      console.log(`projection`, projection)
      return ctrs.role.getRole(models.role, parent, args, projection)
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
    createRole: async (parent, { role: args }, { models }, info) => {
      // const { name, description, permission } = roleField
      // const role = await graphqlHepler.create(models.role, { name, description, permission })
      return await ctrs.role.createRole(models.role, parent, args)
    }
  }
}
