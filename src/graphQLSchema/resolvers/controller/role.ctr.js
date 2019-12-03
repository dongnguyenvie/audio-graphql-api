import modelHepler from '../../../core/helper/model'

class role {
  static async getRole(model, _, args) {
    return modelHepler.findOne(model, args)
  }
  static async createRole(model, _, args) {
    return modelHepler.create(model, args)
  }
}

export default { role }
