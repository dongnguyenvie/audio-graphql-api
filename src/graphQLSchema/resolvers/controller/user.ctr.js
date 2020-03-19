import _ from 'lodash'
import bcrypt from 'bcrypt'
import models from '../../../core/models'
import errors from '../../../utils/errors'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'
import modelHeplers from '../../../core/helper/model'

const _FIELD = constants.models.USER
class user {
  static async getUser(args, { projection, populateSchema } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(models[_FIELD],{ _id }, populateSchema, {})
  }

  static async getUsers(args, { filters, populateSchema } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(models[_FIELD],args, populateSchema, options)
  }

  static async createUser(args, { populateSchema } = {}, options = {}) {
    return modelHeplers.create(models[_FIELD],args, populateSchema)
  }

  static async updateUser(args) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(models[_FIELD],{ _id }, update)
  }

  static async deleteUser(args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(models[_FIELD],{ _id })
  }

  static async changePassword(args, { projection, req } = {}, options = {}) {
    const { _id, oldPass, newPass, confirmPass } = helper.mapToIndexDoc(args)
    if (!_.isEqual(newPass, confirmPass)) {
      errors.show(`newPass and confirmPass are not the same`, constants.errors.VALIDATION_ERROR)
    }
    const currentUser = req.session.user

    if (currentUser.id !== _id) {
      errors.show(`You are not authorized`, constants.errors.AUTHENTICATION_ERROR)
    }
    let isPasswordMatched = bcrypt.compareSync(oldPass, currentUser.password)
    if (!isPasswordMatched) {
      errors.show(`Password is wrong`, constants.errors.VALIDATION_ERROR)
    }
    const newUser = await modelHeplers.update(models[_FIELD],{ _id }, { password: newPass })
    if (newUser.success) {
      req.session.user = newUser.result
    }
    return newUser
  }
}

export default { user }
