import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'

class user {
  static getUser(model, args, { projection }, options = {}) {
    return modelHeplers.findOne(model, args, projection)
  }
  static createUser(model, args, { projection }, options = {}) {
    return modelHeplers.create(model, args)
  }
  static async updateUser(model, args) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id })
  }
  static async deleteUser(model, args, { projection }, options = {}) {}
  static async changePassword(model, args, { projection }, options = {}) {}
  static async changePassword(model, args, { projection }, options) {}
}

export default { user }
// login: async (parent, { name, password }, { models, req }, info) => {
//   const user = await models.user.findOne({ name }).exec()

//   if (!user) {
//     throw new AuthenticationError('Invalid credentials')
//   }

//   const matchPasswords = bcrypt.compareSync(password, user.password)

//   if (!matchPasswords) {
//     throw new AuthenticationError('Invalid credentials')
//   }
//   req.session.user = user;
//   const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 })
//   return {
//     token
//   }
// },
// isLogin: async (parent, _, { models, me, req }, info) => {
//   return me
// }
