import _ from 'lodash'
import models from '../../../core/models'
import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import ctrs from './'
import * as constants from '../../../utils/constants'

const _FIELD = constants.models.BLOG
class blog {
  static async getBlog(args, { populateSchema } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(models[_FIELD], { _id }, populateSchema)
  }

  static async getBlogs(args, { populateSchema, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(models[_FIELD], args, populateSchema, options)
  }

  static async createBlog(args, { models, user, populateSchema } = {}) {
    const blogExits = await modelHeplers.findOne(models[_FIELD], { user: user.id }, {}, { defaultDocsFlg: true })
    if (blogExits) {
      throw new Error(`Blog already exists ${blogExits}`)
    }
    const { jsonLD, status, tags, ..._args } = args
    // const metaData = await ctrs.metaData.createMeta(models['metaData'], { jsonLD, status, tags }, {}, { defaultDocsFlg: true })
    return modelHeplers.create(models[_FIELD], { ..._args, user: user.id }, populateSchema)
  }

  static async updateBlog(args, { populateSchema } = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(models[_FIELD], { _id }, update)
  }

  static async deleteBlog(args, { populateSchema } = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(models[_FIELD], { _id })
  }
}

export default { blog }
