import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import ctrs from '.'
import _ from 'lodash'

class blog {
  static async getBlog(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }
  static async getBlogs(model, args, { projection, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(model, args, projection, options)
  }
  static async createBlog(model, args, { models, currentUser } = {}) {
    // const { jsonLD, status, tags, ...argsPost } = args
    const blogExits = await modelHeplers.findOne(model, { user: currentUser._id }, null, { defaultDocsFlg: true })
    if (blogExits) {
      throw new Error('error')
    }

    // title content user metaData isDelete
    const metaData = await ctrs.metaData.createMeta(models['metaData'], { jsonLD, status, tags }, {}, { defaultDocsFlg: true })

    return {}
    const blog = modelHeplers.create({ ...argsPost, metaData: metaData._id })
    return blog
  }
  static async updateBlog(model, args, { projection } = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(model, { _id }, update)
  }
  static async deleteBlog(model, args, { projection } = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id })
  }
}

export default { blog }
