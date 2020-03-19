import _ from 'lodash'
import models from '../../../core/models'
import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'

const _FIELD = constants.models.ROLE
class role {
  static async getRole(args, { populateSchema } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(models[_FIELD], { _id }, populateSchema)
  }
  static async getRoles(args, { projection, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(models[_FIELD], args, projection, options)
  }
  static async createRole(args, { populateSchema }) {
    return modelHeplers.create(models[_FIELD], args, populateSchema)
  }
  static async updateRole(args, {} = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(models[_FIELD], { _id }, update)
  }
  static async deleteRole(args, {} = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(models[_FIELD], { _id })
  }
}

export default { role }
