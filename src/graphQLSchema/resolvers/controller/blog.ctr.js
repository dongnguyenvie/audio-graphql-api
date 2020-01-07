import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import ctrs from '.'
import _ from 'lodash'

class blog {
  static async getBlog(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }

  static async getBlogs(model, args, { populateSchema, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(model, args, populateSchema, options)
  }

  static async createBlog(model, args, { models, user, populateSchema } = {}) {
    const blogExits = await modelHeplers.findOne(model, { user: user.id }, populateSchema, { defaultDocsFlg: true })
    if (blogExits) {
      throw new Error('Blog already exists')
    }
    const { jsonLD, status, tags, ...argsPost } = args
    // const metaData = await ctrs.metaData.createMeta(models['metaData'], { jsonLD, status, tags }, {}, { defaultDocsFlg: true })
    return modelHeplers.create(model, { ...argsPost, user: user.id }, populateSchema)
  }

  static async updateBlog(model, args, { populateSchema } = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(model, { _id }, update)
  }

  static async deleteBlog(model, args, { populateSchema } = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(model, { _id })
  }
}

export default { blog }
