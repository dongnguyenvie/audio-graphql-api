import modelHepler from '../../../core/helper/model'
import helper from '../../../core/common/helper'

import _ from 'lodash'
class role {
  static async getRole(model, _, args, projection) {
    const conditions = helper.mapToIndexDoc(args)
    return modelHepler.findOne(model, conditions, projection)
  }
  static async createRole(model, _, args) {
    return modelHepler.create(model, args)
  }
}

export default { role }
