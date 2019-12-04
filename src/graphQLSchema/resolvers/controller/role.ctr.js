import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'

import _ from 'lodash'
class role {
  static async getRole(model, args, projection, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }
  static async getRoles(model, args, projection, options = {}) {
    return modelHeplers.findAll(model, args, projection)
  }
  static async createRole(model, args) {
    return modelHeplers.create(model, args)
  }
  static async updateRole(model, args) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(model, { _id }, update);
  }
  static async deleteRole(model, args) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id });
  }
}

export default { role }
