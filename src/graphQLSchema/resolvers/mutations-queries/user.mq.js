import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as constants from '../../../core/types'

const FIELD = 'user'

export default {
  Query: {
    getUser: async (_, args, { models }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[FIELD]
      return ctrs[FIELD].getUser(models[FIELD], conditions, { populateSchema })
    },
    getUsers: async (_, args, { models }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getUsers(models[FIELD], conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createUser: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[FIELD].createUser(models[FIELD], conditions, { populateSchema })
    },
    updateUser: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].updateUser(models[FIELD], conditions)
    },
    deleteUser: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].deleteUser(models[FIELD], conditions)
    },
    changePassword: async (_, args, { models, req }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].changePassword(models[FIELD], conditions, { req })
    }
  }
}
