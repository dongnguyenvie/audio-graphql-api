import helper from '../../../core/common/helper'

const FIELD = 'user'
/**
 * In this case docs === userDocs
 * async (docs, args, context, info)
 */
export default {
  User: {
    roles: async (docs, args, { models }, info) => {
      const projection = helper.getProjection(info, false)
      const user = await models[FIELD].findById(docs._id, 'roles').populate('roles', projection)
      return user.roles
    },
    id: async (docs, args) => {
      return docs._id
    }
  }
}
