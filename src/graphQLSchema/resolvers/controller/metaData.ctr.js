import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import ctrs from '.'
import _ from 'lodash'

class metaData {
  static async createMeta(model, args, { projection } = {}, options = {}) {
    return modelHeplers.create(model, args, {}, options)
  }
}

export default { metaData }
