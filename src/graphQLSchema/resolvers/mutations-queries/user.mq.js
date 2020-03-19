import ctrs from '../controller'
import * as types from '../../../core/types'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'

const _FIELD = constants.models.USER

export default {
  Query: {
    getUser: async (_, args, { models }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[_FIELD]
      return ctrs[_FIELD].getUser(conditions, { populateSchema })
    },
    getUsers: async (_, args, { models }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[types.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[_FIELD].getUsers(conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createUser: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[_FIELD].createUser(conditions, { populateSchema })
    },
    updateUser: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].updateUser(conditions)
    },
    deleteUser: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].deleteUser(conditions)
    },
    changePassword: async (_, args, { models, req }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].changePassword(conditions, { req })
    }
  }
}
