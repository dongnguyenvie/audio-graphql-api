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
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[FIELD].getRole(models[FIELD], args[FIELD], { populateSchema })
    },
    getBlogs: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getRoles(models[FIELD], conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createBlog: async (_, args, { models, req }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[FIELD]
      const user = helper.getCurrentUser(req)
      return ctrs[FIELD].createBlog(models[FIELD], conditions, { models, user, populateSchema })
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
