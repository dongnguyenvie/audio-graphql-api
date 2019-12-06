import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import _ from 'lodash'

class role {
  static async getPost(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }
  static async getPosts(model, args, { projection, filters } = {}, options = {}) {
    return modelHeplers.findPaging(model, args, projection, filters)
  }
  static async createPost(model, args) {
    return modelHeplers.create(model, args)
  }
  static async updatePost(model, args, { projection } = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(model, { _id }, update)
  }
  static async deletePost(model, args, { projection } = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id })
  }
}

export default { role }
