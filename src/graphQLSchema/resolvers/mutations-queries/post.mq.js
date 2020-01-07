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
      const populateSchema = helper.getPopulateSchema(info)
      return ctrs[FIELD].getPost(models[FIELD], args[FIELD], { populateSchema })
    },
    getPosts: async (_, args, { models, me }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'docs')
      const _args = args[constants.INPUT_FILTERS_KEY]
      const { query: conditions = {}, ...filters } = _args
      return ctrs[FIELD].getPosts(models[FIELD], conditions, { populateSchema, filters })
    }
  },
  Mutation: {
    createPost: async (_, args, { models, req }, info) => {
      const populateSchema = helper.getPopulateSchema(info)
      const conditions = args[FIELD]
      const user = helper.getCurrentUser(req)
      return ctrs[FIELD].createPost(models[FIELD], conditions, { populateSchema, user })
    },
    updatePost: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].updatePost(models[FIELD], conditions)
    },
    deletePost: async (_, args, { models }, info) => {
      const conditions = args[FIELD]
      return ctrs[FIELD].deletePost(models[FIELD], conditions)
    }
  }
}
