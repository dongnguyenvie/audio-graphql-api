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
   * 
   * findAll
   * 
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

  static async findPaging(model, conditions = {}, options = {}) {
    const foundResults = await model.paginate(conditions, options)

    return {
      ...(!foundResults
        ? {
          success: false,
          message: `Get ${this.getModelName(model)} failed!`
        }
        : { success: true, result: foundResults })
    }
  }

  /**
   * findOne
   * 
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.findOne}
   * @param {Schema} model The Schema instance
   * @param {Object} conditions Conditions
   * @param {Object|String} projection  Optional fields to return, see Query.prototype.select()
   * @param {Object} options Optional see Query.prototype.setOptions()
   * @param {*} populate don't used
   * @returns {Promise} response
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
   * create
   * 
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.create}
   * @param {*} model 
   * @param {*} docs 
   */
  static async create(model, docs = {}) {
    const asyncData = model.create(docs)
    return this.responseExec(model, asyncData, METHOD.CREATE)
  }

  /**
   * Update
   * 
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
   * Delete
   * 
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete}
   * @param {*} model 
   * @param {*} conditions 
   * @param {*} options 
   */
  static async delete(model, conditions = {}, options = {}) {
    const asyncData = model.findOneAndDelete(conditions, options)
    return this.responseExec(model, asyncData, METHOD.DELETE)
  }

  static async deleteMany(model, conditions = {}, options = {}) {
    const deletedRecord = await model.deleteMany(conditions, options)

    return {
      ...(!deletedRecord && !deletedRecord.ok
        ? {
          success: false,
          message: `Delete ${this.getModelName(model)} failed!`
        }
        : { success: true })
    }
  }
  static async softDelete(model, conditions = {}, options = {}) {
    return this.update(model, conditions, { isDel: true }, options)
  }
  static async recover(model, conditions = {}, options = {}) {
    return this.update(model, conditions, { isDel: false }, options)
  }
  static getModelName(model) {
    return model.collection.collectionName
  }
}

export default ModelHeplers
