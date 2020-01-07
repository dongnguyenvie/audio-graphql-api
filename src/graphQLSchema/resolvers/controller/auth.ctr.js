import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import { UserInputError, ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server'
import jwt from 'jsonwebtoken'
class auth {
  static async login(model, args, { populateSchema, SECRET, req, isAdmin = false } = {}, options = {}) {
    // Populate with roles table
    Object.assign(populateSchema, { roles: { projection: 'id permission description name' } })
    populateSchema.projection = `${populateSchema.projection} password id username fullName avatar email phone`

    const { username, password, rememberMe } = args
    const user = await modelHeplers.findOne(model, { username }, populateSchema, { ...options, defaultDocsFlg: true })
    if (!user || !helper.comparePassword(password, user.password)) {
      throw new ApolloError('user is not correct')
    }
    const _user = helper.mapUserSession(user)
    if (rememberMe) {
      req.session.user = _user
    }
    const token = helper.createToken(_user, SECRET)

    return {
      user,
      token
    }
  }
}

export { auth }
