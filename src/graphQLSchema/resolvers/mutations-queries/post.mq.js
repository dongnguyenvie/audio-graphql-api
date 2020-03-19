import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as types from '../../../core/types'
import * as constants from '../../../utils/constants'

const _FIELD = constants.models.POST
/**
 * Post resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getPost: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[_FIELD].getPost(args[_FIELD], { populateSchema })
    },
    getPosts: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[types.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[_FIELD].getPosts(conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createPost: async (_, args, { models, req }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[_FIELD]
      const user = helper.getCurrentUser(req)
      return ctrs[_FIELD].createPost(conditions, { populateSchema, user, models })
    },
    updatePost: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].updatePost(conditions)
    },
    deletePost: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].deletePost(conditions)
    }
  }
}
