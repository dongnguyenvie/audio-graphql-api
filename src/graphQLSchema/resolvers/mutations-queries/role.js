import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import helper from '../../../core/common/helper'

const FIELD_NM = 'role'
/**
 * Role resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getRole: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD_NM].getRole(models[FIELD_NM], args[FIELD_NM], { projection })
    },
    getRoles: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD_NM].getRoles(models[FIELD_NM], args[FIELD_NM], { projection })
    }
  },
  Mutation: {
    createRole: async (_, args, { models }, info) => {
      return ctrs[FIELD_NM].createRole(models[FIELD_NM], args[FIELD_NM])
    },
    updateRole: async (_, args, { models }, info) => {
      return ctrs[FIELD_NM].updateRole(models[FIELD_NM], args[FIELD_NM])
    },
    deleteRole: async (_, args, { models }, info) => {
      return ctrs[FIELD_NM].deleteRole(models[FIELD_NM], args[FIELD_NM])
    }
  }
}
