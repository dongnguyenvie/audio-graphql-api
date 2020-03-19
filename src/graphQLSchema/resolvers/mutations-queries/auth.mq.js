import ctrs from '../controller'
import helper from '../../../core/common/helper'
import * as constants from '../../../utils/constants'

const _FIELD = constants.models.AUTH
export default {
  Query: {
    login: (_, args, { models, me, SECRET, req }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'user')
      const conditions = args[_FIELD]
      return ctrs[_FIELD].login(conditions, { SECRET, req, populateSchema })
    }
  },
  Mutation: {}
}
