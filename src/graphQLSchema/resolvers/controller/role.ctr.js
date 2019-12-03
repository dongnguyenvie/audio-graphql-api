import hepler from '../../../core/helper/graphql'

class role {
  static async getRole(model, _, args) {
    return await hepler.findOne(model, args)
  }
  static async createRole(model, _, args) {
    return await hepler.create(model, args)
  }
}

export default { role }
