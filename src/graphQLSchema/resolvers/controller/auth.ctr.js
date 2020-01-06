import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import { UserInputError, ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server'
import jwt from 'jsonwebtoken'
class auth {
  static async login(model, args, { projection, SECRET, req, isAdmin = false } = {}, options = {}) {
    const { username, password, rememberMe } = args
    const user = await modelHeplers.findOne(model, { username }, '', { ...options, defaultDocsFlg: true })
    // asyncData.populate('roles')
    if (user && helper.comparePassword(password, user.password)) {
      new ApolloError('user is not correct')
    }

    if (rememberMe) {
      req.session.user = user
    }

    const token = helper.createToken(user, SECRET)
    console.log(token)
    return {
      user,
      token
    }
  }

  static checkAuth({ token, isAdminSite = false, SECRET }, req) {
    if (req.session && req.session.user) {
      return req.session.user
    } else if (token) {
      return parseToken(token, SECRET)
    }
  }

  static parseToken(token, secret) {
    var decoded = jwt.verify(token, secret)
    return decoded
  }

  static getToken({ id }, secret) {
    const token = jwt.sign({ userId: id }, secret, {
      expiresIn: 60 * 60 * 24 * 7 * 1000
    })
    return token
  }
}

export { auth }
