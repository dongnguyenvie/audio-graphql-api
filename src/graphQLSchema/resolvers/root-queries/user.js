import helper from '../../../core/common/helper'

const FIELD = 'user'
const FIELDS_POPULATE = ['roles']

/**
 * In this case docs === userDocs
 * async (docs, args, context, info)
 */
const User = {
  // ...helper.mapPopulate(FIELD, FIELDS_POPULATE),
  // roles: async (docs, args, { models }, info) => {
  //   console.log(1111)
  //   const projection = helper.getProjection(info, false)
  //   const user = await models[FIELD].findById(docs._id, 'roles').populate('roles', projection)
  //   console.log(1111, user);
  //   return user.roles
  // },
  // id: async (docs, args) => {
  //   return docs._id
  // }
}

export default {
  User
}
