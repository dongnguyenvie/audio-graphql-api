import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as constants from '../../../core/types'

const FIELD = 'post'
/**
 * Post resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getPost: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD].getRole(models[FIELD], args[FIELD], { projection })
    },
    getPosts: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getRoles(models[FIELD], conditions, { projection, filters })
    }
  },
  Mutation: {
    createPost: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].createRole(models[FIELD], conditions)
    },
    updatePost: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].updateRole(models[FIELD], conditions)
    },
    deletePost: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].deleteRole(models[FIELD], conditions)
    }
  }
}
