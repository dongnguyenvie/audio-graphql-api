import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as constants from '../../../core/types'

const FIELD = 'role'
/**
 * Role resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getRole: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[FIELD].getRole(models[FIELD], args[FIELD], { populateSchema })
    },
    getRoles: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getRoles(models[FIELD], conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createRole: async (_, args, { models }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[FIELD]
      return ctrs[FIELD].createRole(models[FIELD], conditions, { populateSchema })
    },
    updateRole: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].updateRole(models[FIELD], conditions)
    },
    deleteRole: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].deleteRole(models[FIELD], conditions)
    }
  }
}
