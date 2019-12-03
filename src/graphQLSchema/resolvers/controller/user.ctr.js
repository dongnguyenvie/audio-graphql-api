import hepler from '../../../core/helper/graphql'

class user {
  static getUser(_, args, model) {
    return hepler.findOne(model, args)
  }
  static createUser(_, args, model) {
    return hepler.create(model, args)
  }
}

export default { user }
