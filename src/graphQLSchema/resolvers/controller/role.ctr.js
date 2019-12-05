import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import * as constants from '../../../core/types'
import _ from 'lodash'
import GraphQLJSON from 'graphql-type-json';
class role {
  static async getRole(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }
  static async getRoles(model, args, { projection, filters } = {}, options = {}) {
    return modelHeplers.findPaging(model, args, projection, filters)
  }
  static async createRole(model, args) {
    return modelHeplers.create(model, args)
  }
  static async updateRole(model, args, { projection } = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(model, { _id }, update)
  }
  static async deleteRole(model, args, { projection } = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id })
  }
}

export default { role }
