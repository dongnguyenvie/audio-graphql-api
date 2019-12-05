import logger from '../../utils/logger'

const METHOD = {
  CREATE: 'Create',
  GET: 'Get',
  UPDATE: 'Update',
  DELETE: 'Delete'
}

/**
 * ModelHeplers
 * @see {@href https://mongoosejs.com/docs/api/schema.html#schema_Schema}
 */
class ModelHeplers {
  static async responseExec(model, asyncData, method) {
    let response = {}
    const modelNm = this.getModelName(model)
    try {
      const docs = await asyncData
      console.log(`docs`, docs)
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

  /**
   * @see {@href https://mongoosejs.com/docs/api/model.html#model_Model.find}
   * @param {*} model
   * @param {*} conditions
   * @param {*} projection
   * @param {*} options
   */
  static async findAll(model, conditions = {}, projection = '', options = {}) {
    const asyncData = model.find(conditions, projection, options)
    return this.responseExec(model, asyncData, METHOD.GET)
  }

  /**
   * @see {@href https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback}
   * @param {*} model 
   * @param {*} conditions 
   * @param {*} options 
   */
  static async findPaging(model, conditions = {}, projection = '', options = {}) {
    const asyncData = model.paginate(conditions, options)
    return this.responseExec(model, asyncData, METHOD.GET)
  }

  /**
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.findOne}
   * @param {Schema} model The Schema instance
   * @param {Object} conditions Conditions
   * @param {Object|String} projection  Optional fields to return, see Query.prototype.select()
   * @param {Object} options Optional see Query.prototype.setOptions()
   * @param {*} populate don't used
   * @returns {Promise} docs
   */
  static async findOne(model, conditions = {}, projection = '', options = {}, populate) {
    let asyncData
    if (populate) {
      asyncData = model.findOne(conditions, projection, options).populate(populate)
    } else {
      asyncData = model.findOne(conditions, projection, options)
    }
    return await this.responseExec(model, asyncData, METHOD.GET)
  }

  /**
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.create}
   * @param {*} model
   * @param {*} docs
   */
  static async create(model, docs = {}) {
    const asyncData = model.create(docs)
    return this.responseExec(model, asyncData, METHOD.CREATE)
  }

  /**
   * @see {@href https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate}
   * @param {*} model
   * @param {*} conditions
   * @param {*} update
   * @param {*} options
   */
  static async update(model, conditions = {}, update = {}, options = {}) {
    Object.assign(options, {
      new: true // bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    })
    const asyncData = model.findOneAndUpdate(conditions, update, options)
    return this.responseExec(model, asyncData, METHOD.UPDATE)
  }

  /**
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete}
   * @param {*} model
   * @param {*} conditions
   * @param {*} options
   */
  static async delete(model, conditions = {}, options = {}) {
    const asyncData = model.findOneAndDelete(conditions, options)
    return this.responseExec(model, asyncData, METHOD.DELETE)
  }

  /**
   * @see {@href https://mongoosejs.com/docs/api/query.html#query_Query-deleteMany}
   * @param {*} model 
   * @param {*} conditions filter 
   * @param {*} options 
   */
  static async deleteMany(model, conditions = {}, options = {}) {
    const asyncData = await model.deleteMany(conditions, options)
    return this.responseExec(mode, asyncData, METHOD.DELETE)
  }

  static async softDelete(model, conditions = {}, options = {}) {
    return this.update(model, conditions, { isDel: true }, options)
  }
  static async recover(model, conditions = {}, options = {}) {
    return this.update(model, conditions, { isDel: false }, options)
  }

  /**
   * @see {@href https://stackoverflow.com/questions/43331706/how-to-get-collection-name-from-a-mongoose-model-object?answertab=active#tab-top}
   * @param {*} model 
   */
  static getModelName(model) {
    return model.collection.collectionName
  }
}

export default ModelHeplers
