import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import helper from '../../../core/common/helper'

const FIELD = 'role'
/**
 * Role resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getRole: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD].getRole(models[FIELD], args[FIELD], { projection })
    },
    getRoles: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD].getRoles(models[FIELD], args[FIELD], { projection })
    }
  },
  Mutation: {
    createRole: async (_, args, { models }, info) => {
      return ctrs[FIELD].createRole(models[FIELD], args[FIELD])
    },
    updateRole: async (_, args, { models }, info) => {
      return ctrs[FIELD].updateRole(models[FIELD], args[FIELD])
    },
    deleteRole: async (_, args, { models }, info) => {
      return ctrs[FIELD].deleteRole(models[FIELD], args[FIELD])
    }
  }
}
