import jwt from 'jsonwebtoken'
import models from '../../../core/models'
import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'
import errors from '../../../utils/errors'

class auth {
  static async login(args, { populateSchema, SECRET, req, isAdmin = false } = {}, options = {}) {
    // Populate with roles table
    Object.assign(populateSchema, { roles: { projection: 'id permission description name' } })
    populateSchema.projection = `${populateSchema.projection} password id username fullName avatar email phone`

    const { username, password, rememberMe } = args
    const user = await modelHeplers.findOne(models[constants.models.USER], { username }, populateSchema, { ...options, defaultDocsFlg: true })
    if (!user || !helper.comparePassword(password, user.password)) {
      errors.show('user is not correct', constants.errors.VALIDATION_ERROR)
    }
    const blog = await models[constants.models.BLOG].findOne({user: user.id}, 'id')
    if (blog) {
      user.blog = blog.id
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
