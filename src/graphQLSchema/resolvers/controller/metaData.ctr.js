import _ from 'lodash'
import ctrs from './'
import models from '../../../core/models'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'
import modelHeplers from '../../../core/helper/model'

const _FIELD = constants.models.META_DATA
class metaData {
  static async createMeta(args, { projection } = {}, options = {}) {
    return modelHeplers.create(models[_FIELD], args, {}, options)
  }
}

export default { metaData }
