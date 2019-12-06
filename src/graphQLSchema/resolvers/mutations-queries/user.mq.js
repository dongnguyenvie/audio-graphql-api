import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as constants from '../../../core/types'

const FIELD = 'user'

export default {
  Query: {
    getUser: async (_, args, { models }, info) => {
      const projection = helper.getProjection(info)
      const conditions = args[FIELD];
      return ctrs[FIELD].getUser(models[FIELD], conditions, { projection })
    },
    getUsers: async (_, args, { models }, info) => {
      const projection = helper.getProjection(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getRoles(models[FIELD], conditions, { projection, filters })
    }
  },
  Mutation: {
    createUser: async (_, args, { models }, info) => {
      const conditions = args[FIELD];
      return ctrs[FIELD].createUser(models[FIELD], conditions)
    },
    updateUser: async (_, args, { models }, info) => {
      const conditions = args[FIELD];
      return ctrs[FIELD].updateUser(models[FIELD], conditions)
    },
    deleteUser: async (_, args, { models }, info) => {
      const conditions = args[FIELD];
      return ctrs[FIELD].deleteUser(models[FIELD], conditions)
    },
    changePassword: async (_, args, { models }, info) => {
      const conditions = args[FIELD];
      return ctrs[FIELD].changePassword(models[FIELD], conditions)
    }
  }
}
