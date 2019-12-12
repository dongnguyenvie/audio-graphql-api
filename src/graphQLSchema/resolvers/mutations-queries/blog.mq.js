import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as constants from '../../../core/types'

const FIELD = 'blog'
/**
 * Post resolvers
 * async (root, args, context, info)
 */
export default {
  Query: {
    getBlog: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD].getRole(models[FIELD], args[FIELD], { projection })
    },
    getBlogs: async (_, args, { models, me }, info) => {
      const projection = helper.getProjection(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getRoles(models[FIELD], conditions, { projection, filters })
    }
  },
  Mutation: {
    createBlog: async (_, args, { models, req }, info) => {
      const conditions = args[FIELD]
      const currentUser = helper.getCurrentUser(req)
      return ctrs[FIELD].createBlog(models[FIELD], conditions, { models, currentUser })
    },
    updateBlog: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].updateRole(models[FIELD], conditions)
    },
    deleteBlog: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].deleteRole(models[FIELD], conditions)
    }
  }
}
