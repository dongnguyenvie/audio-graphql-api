import logger from '../../utils/logger'

const METHOD = {
  CREATE: 'Create',
  GET: 'Get',
  UPDATE: 'Update',
  DELETE: 'Delete'
}

/**
 * ModelHeplers
 * @see {@link https://mongoosejs.com/docs/api/schema.html#schema_Schema}
 */
class ModelHeplers {
  static async execResponse(model, asyncData, method) {
    let response = {}
    const modelNm = this.getModelName(model)
    try {
      const docs = await asyncData
      response = { success: true, result: docs }
    } catch (error) {
      logger.error(error)
      response = {
        success: false,
        message: `${method} ${modelNm} failed!`
      }
    }
    return response
  }
  static async execDefaultResponse(model, asyncData, method) {
    let response = {}
    try {
      response = await asyncData
    } catch (error) {
      // response = `${method} ${modelNm} failed!`
      response = false
      logger.error(error)
    }
    return response
  }

  /**
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.find}
   * @param {*} model
   * @param {*} conditions
   * @param {*} projection
   * @param {*} options
   */
  static async findAll(model, conditions = {}, projection = '', options = {}) {
    const asyncData = model.find(conditions, projection, options)
    return this.execResponse(model, asyncData, METHOD.GET)
  }

  /**
   * @see {@link https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback}
   * @param {*} model
   * @param {*} conditions
   * @param {*} options
   */
  static async findPaging(model, conditions = {}, projection = '', options = {}) {
    const { filters, defaultDocsFlg } = { defaultDocsFlg: true, ...options }
    const asyncData = model.paginate(conditions, filters)
    if (defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.GET)
    }
    return this.execResponse(model, asyncData, METHOD.GET)
  }

  /**
   * @see {@link https://mongoosejs.com/docs/api.html#model_Model.findOne}
   * @param {Schema} model The Schema instance
   * @param {Object} conditions Conditions
   * @param {Object|String} projection  Optional fields to return, see Query.prototype.select()
   * @param {Object} options Optional see Query.prototype.setOptions()
   * @param {Boolean} options.defaultDocsFlg if default reponse then docsFlg = true
   * @returns {Promise} docs
   */
  static async findOne(model, conditions = {}, projection = '', options = {}) {
    const asyncData = model.findOne(conditions, projection, options)
    if (options.defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.CREATE)
    }
    return this.execResponse(model, asyncData, METHOD.GET)
  }

  /**
   * @see {@link https://mongoosejs.com/docs/api.html#model_Model.create}
   * @param {*} model
   * @param {*} docs
   */
  static async create(model, docs = {}, options = {}) {
    const _options = {
      defaultDocsFlg: false,
      ...options
    }
    const asyncData = model.create(docs)
    if (_options.defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.CREATE)
    }
    return this.execResponse(model, asyncData, METHOD.CREATE)
  }

  /**
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate}
   * @param {*} model
   * @param {*} conditions
   * @param {*} update
   * @param {*} options
   */
  static async update(model, conditions = {}, update = {}, options = {}) {
    const _options = {
      new: true, // bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
      ...options
    }
    const asyncData = model.findOneAndUpdate(conditions, update, _options)
    if (options.defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.UPDATE)
    }
    return this.execResponse(model, asyncData, METHOD.UPDATE)
  }

  /**
   * @see {@link https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete}
   * @param {*} model
   * @param {*} conditions
   * @param {*} options
   */
  static async delete(model, conditions = {}, options = {}) {
    const asyncData = model.findOneAndDelete(conditions, options)
    if (options.defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.DELETE)
    }
    return this.execResponse(model, asyncData, METHOD.DELETE)
  }

  /**
   * @see {@link https://mongoosejs.com/docs/api/query.html#query_Query-deleteMany}
   * @param {*} model
   * @param {*} conditions filter
   * @param {*} options
   */
  static async deleteMany(model, conditions = {}, options = {}) {
    const asyncData = await model.deleteMany(conditions, options)
    if (options.defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.DELETE)
    }
    return this.execResponse(mode, asyncData, METHOD.DELETE)
  }

  /**
   *
   * @param {*} model
   * @param {*} conditions
   * @param {*} options
   */
  static async softDelete(model, conditions = {}, options = {}) {
    return this.update(mode, conditions, { isDelete: true }, options)
  }

  /**
   *
   * @param {*} model
   * @param {*} conditions
   * @param {*} options
   */
  static async hardDelete(model, conditions = {}, options = {}) {
    let _conditions = { isDelete: true, ...conditions }
    const asyncData = model.remove(_conditions, options)
    if (options.defaultDocsFlg) {
      return this.execDefaultResponse(model, asyncData, METHOD.DELETE)
    }
    return this.execResponse(model, asyncData, METHOD.DELETE)
  }

  /**
   *
   * @param {*} model
   * @param {*} conditions
   * @param {*} options
   */
  static async recover(model, conditions = {}, options = {}) {
    return this.update(model, conditions, { isDelete: false }, options)
  }

  /**
   * @see {@link https://stackoverflow.com/questions/43331706/how-to-get-collection-name-from-a-mongoose-model-object?answertab=active#tab-top}
   * @param {*} model
   */
  static getModelName(model) {
    return model.collection.collectionName
  }
}

export default ModelHeplers
