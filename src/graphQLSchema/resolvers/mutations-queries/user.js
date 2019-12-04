import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server'
import ctrs from '../controller'
import helper from '../../../core/common/helper'

const FIELD = 'user'

export default {
  Query: {
    getUser: async (_, args, { models }, info) => {
      const projection = helper.getProjection(info)
      return ctrs[FIELD].getUser(models[FIELD], args[FIELD], { projection })
    },
    getUsers: async (_, args, { models }, info) => {}
  },
  Mutation: {
    createUser: async (_, args, { models }, info) => {
      return ctrs[FIELD].createUser(models[FIELD], args[FIELD])
    },
    updateUser: async (_, args, { models }, info) => {
      return ctrs[FIELD].updateUser(models[FIELD], args[FIELD])
    },
    deleteUser: async (_, args, { models }, info) => {
      return ctrs[FIELD].deleteUser(models[FIELD], args[FIELD])
    },
    changePassword: async (_, args, { models }, info) => {
      return ctrs[FIELD].changePassword(models[FIELD], args[FIELD])
    }
  }
}
