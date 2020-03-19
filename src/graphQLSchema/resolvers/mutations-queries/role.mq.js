import ctrs from '../controller'
import * as types from '../../../core/types'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'

const _FIELD = constants.models.ROLE
/**
 * Role resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getRole: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[_FIELD].getRole(args[_FIELD], { populateSchema })
    },
    getRoles: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[types.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[_FIELD].getRoles(conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createRole: async (_, args, { models }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[_FIELD]
      return ctrs[_FIELD].createRole(conditions, { populateSchema })
    },
    updateRole: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].updateRole(conditions)
    },
    deleteRole: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].deleteRole(conditions)
    }
  }
}
