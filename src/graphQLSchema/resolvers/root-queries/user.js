import helper from '../../../core/common/helper'

const FIELD = 'user'
/**
 * async (root, args, context, info)
 */
export default {
  User: {
    roles: async (userDocs, args, { models }, info) => {
      const projection = helper.getProjection(info, false)
      const user = await models[FIELD].findById(userDocs._id, 'roles').populate('roles', projection)
      return user && user.roles
    },
    id: async (userDocs, args) => {
      return userDocs._id
    }
  }
}
