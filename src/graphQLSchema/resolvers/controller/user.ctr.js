import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'

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
  static async changePassword(model, args, { projection } = {}, options = {}) {
    return {}
  }
}

export default { user }