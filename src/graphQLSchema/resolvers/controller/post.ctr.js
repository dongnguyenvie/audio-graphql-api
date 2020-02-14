import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'
import ctrs from '.'
import _ from 'lodash'

class post {
  static async getPost(model, args, { projection } = {}, options = {}) {
    const { _id } = helper.mapToIndexDoc(args)
    return modelHeplers.findOne(model, { _id }, projection)
  }
  static async getPosts(model, args, { projection, filters } = {}, options = {}) {
    Object.assign(options, { filters })
    return modelHeplers.findPaging(model, args, projection, options)
  }
  static async createPost(model, args, { populateSchema, user, models }) {
    const { jsonLD, status, tags, ..._args } = args
    _args.title = `${args.title}${Math.random()}`
    const metaData = await ctrs.metaData.createMeta(models['metaData'], { jsonLD: JSON.stringify(jsonLD), status, tags }, {}, { defaultDocsFlg: true })
    console.log(metaData.jsonLD)
    const post = modelHeplers.create(model, { ..._args, metaData: metaData.id, user: user.id }, populateSchema)
    Object.assign(post, { jsonLD: metaData.jsonLD, tags: metaData.tags, status: metaData.status })
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

export default { post }
