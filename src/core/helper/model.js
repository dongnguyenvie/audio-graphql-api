import logger from '../../utils/logger'

const METHOD = {
  CREATE: 'Create',
  GET: 'Get'
}

/**
 * ModelHepler
 * @see {@href https://mongoosejs.com/docs/api/schema.html#schema_Schema}
 */
class ModelHepler {
  static async responseExec(asyncData, modelNm, method) {
    let response = {}
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

  static async findAll(model, conditions = {}, projection = '', options = {}) {
    const foundResults = await model.find(conditions, projection, options)

    return {
      ...(!foundResults
        ? {
            success: false,
            message: `Get ${this.getModelName(model)} failed!`
          }
        : { success: true, result: foundResults })
    }
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
    console.log(`conditions`, conditions)
    let asyncData
    const modelNm = this.getModelName(model)
    if (populate) {
      asyncData = model.findOne(conditions, projection, options).populate(populate)
    } else {
      asyncData = model.findOne(conditions, projection, options)
    }
    return await this.responseExec(asyncData, modelNm, METHOD.GET)
  }

  /**
   * create
   * 
   * @see {@href https://mongoosejs.com/docs/api.html#model_Model.create}
   * @param {*} model 
   * @param {*} docs 
   */
  static async create(model, docs = {}) {
    const modelNm = this.getModelName(model)
    const asyncData = model.create(docs)
    return await this.responseExec(asyncData, modelNm, METHOD.CREATE)
  }

  static async update(model, conditions = {}, update = {}, options = {}) {
    const updatedRecord = await model.findOneAndUpdate(conditions, update, options)

    updatedRecord && (await updatedRecord.save())

    return {
      ...(!updatedRecord
        ? {
            success: false,
            message: `Update ${this.getModelName(model)} failed!`
          }
        : { success: true, result: updatedRecord })
    }
  }
  static async delete(model, conditions = {}, options = {}) {
    const deletedRecord = await model.findOneAndDelete(conditions, options)

    return {
      ...(!deletedRecord
        ? {
            success: false,
            message: `Delete ${this.getModelName(model)} failed!`
          }
        : { success: true, result: deletedRecord })
    }
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

export default ModelHepler
