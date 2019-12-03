import modelHepler from '../../../core/helper/model'

class user {
  static getUser(_, args, model) {
    return modelHepler.findOne(model, args)
  }
  static createUser(_, args, model) {
    return modelHepler.create(model, args)
  }
}

export default { user }
