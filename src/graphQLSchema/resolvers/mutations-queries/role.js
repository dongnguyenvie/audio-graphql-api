import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'
import graphqlHepler from '../../../core/helper/graphql'

export default {
  Query: {
    getRole: async (parent, { role: roleField }, { models, me }, info) => {
      const { id } = roleField
      const role = await models.role.findById({ _id: id }).exec()
      GraphqlEx.reponse(role)
      return role
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
    createRole: async (parent, { role: roleField }, { models }, info) => {
      const { name, description, permission } = roleField
      const role = await graphqlHepler.create(models.role, { name, description, permission })
      return role
    }
  }
}
