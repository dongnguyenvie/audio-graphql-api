import ctrs from '../controller'
import helper from '../../../core/common/helper'

const FIELD = 'user'
export default {
  Query: {
    login: (_, args, { models, me, SECRET, req }, info) => {
      const populateSchema = helper.getPopulateSchema(info, 'user')
      const conditions = args[FIELD]
      return ctrs['auth'].login(models[FIELD], conditions, { SECRET, req, populateSchema })
    }
  },
  Mutation: {}
}
