import _ from 'lodash'
import models from '../../../core/models'
import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import elastic from '../../../core/plugins/elasticsearch'
import ctrs from './'
import * as constants from '../../../utils/constants'
import errors from '../../../utils/errors'

const _FIELD = constants.models.POST
class post {
  static async getPost(args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(models[_FIELD], { _id }, projection)
  }
  static async getPosts(args, { projection, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(models[_FIELD], args, projection, options)
  }
  static async createPost(args, { populateSchema, user }) {
    const { jsonLD, status, tags, blog, ..._args } = args

    const blogExits = await modelHeplers.findOne(models[constants.models.BLOG], { _id: blog }, {}, { defaultDocsFlg: true })
    if (!blogExits) {
      return errors.output(`Blog's not exits`, constants.errors.VALIDATION_ERROR)
    }

    _args.title = `${args.title}${Math.random()}`

    const metaData = await ctrs.metaData.createMeta(models[constants.models.META_DATA], { jsonLD: JSON.stringify(jsonLD), status, tags }, {}, { defaultDocsFlg: true })
    const post = await modelHeplers.create(models[_FIELD], { ..._args, metaData: metaData.id, user: user.id }, populateSchema)
    // Object.assign(post.result, { jsonLD: metaData.jsonLD, tags: metaData.tags, status: metaData.status })
    elastic.syncData(post, 'posts', 'title content id metaData')
    return post
  }
  static async updatePost(args, { projection } = {}) {
    const { _id, ...update } = helper.mapToIndexDoc(args)
    return modelHeplers.update(models[_FIELD], { _id }, update)
  }
  static async deletePost(args, { projection } = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.delete(models[_FIELD], { _id })
  }
}

export default { post }
