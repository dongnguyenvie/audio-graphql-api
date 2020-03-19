import ctrs from '../controller'
import * as types from '../../../core/types'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'

const __FIELD = constants.models.BLOG
/**
 * Post resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getBlog: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[_FIELD].getRole(args[_FIELD], { populateSchema })
    },
    getBlogs: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[types.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[_FIELD].getRoles(conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createBlog: async (_, args, { models, req }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[_FIELD]
      const user = helper.getCurrentUser(req)
      return ctrs[_FIELD].createBlog(conditions, { models, user, populateSchema })
    },
    updateBlog: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].updateRole(conditions)
    },
    deleteBlog: async (_, args, { models }, info) => {
      const conditions = args[_FIELD]
      return ctrs[_FIELD].deleteRole(conditions)
    }
  }
}
