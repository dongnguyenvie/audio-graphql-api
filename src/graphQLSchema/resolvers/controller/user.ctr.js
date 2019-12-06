import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import { UserInputError, ApolloError, ForbiddenError } from 'apollo-server'
import bcrypt from 'bcrypt'
import _ from 'lodash'

class user {
  static async getUser(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }

  static async createUser(model, args, { projection } = {}, options = {}) {
    return modelHeplers.create(model, args)
  }

  static async updateUser(model, args) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(model, { _id }, update)
  }

  static async deleteUser(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id })
  }

  static async changePassword(model, args, { projection, req } = {}, options = {}) {
    const { _id, oldPass, newPass, confirmPass } = helper.mapToIndexDoc(args)
    if (!_.isEqual(newPass, confirmPass)) {
      new UserInputError(`newPass and confirmPass are not the same`)
    }
    const currentUser = req.session.user
    console.log(currentUser)
    if (currentUser.id !== _id) {
      new UserInputError(`You are not authorized`)
    }
    let isPasswordMatched = bcrypt.compareSync(oldPass, currentUser.password)
    if (!isPasswordMatched) {
      new UserInputError(`Password is wrong`)
    }
    const newUser = await modelHeplers.update(model, { _id }, { password: newPass })
    if (newUser.success) {
      req.session.user = newUser.result;
    }
    return newUser
  }
}

export default { user }
