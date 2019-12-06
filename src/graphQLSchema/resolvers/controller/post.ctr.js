import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import ctrs from '.'
import _ from 'lodash'

class role {
  static async getPost(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }
  static async getPosts(model, args, { projection, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(model, args, projection, options)
  }
  static async createPost(model, args) {
    const { user, jsonLD, status, tags, ..._args } = args
    const metaData = await ctrs.metaData.createMeta(models['metaData'], { jsonLD, status, tags }, {}, { defaultDocsFlg: true })
    const post = modelHeplers.create({ _args, metaData: metaData._id })
    return post
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
