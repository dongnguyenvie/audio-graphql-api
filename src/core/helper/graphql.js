import logger from '../../utils/logger'

const METHOD = {
  CREATE: 'Create'
}
class GralhqlHelper {
  static async response(asyncData, modelNm, method) {
    let response = {}
    try {
      const createdRecord = await asyncData
      response = { success: true, result: createdRecord }
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

  static async findOne(model, conditions = {}, projection = '', options = {}, populate = []) {
    let foundResults
    if (populate) {
      foundResults = await model.findOne(conditions, projection, options).populate(populate)
    } else {
      foundResults = await model.findOne(conditions, projection, options)
    }

    return {
      ...(!foundResults
        ? {
            success: false,
            message: `Get ${this.getModelName(model)} failed!`
          }
        : { success: true, result: foundResults })
    }
  }
  static async create(model, args) {
    const modelNm = this.getModelName(model)
    return await this.response(model.create(args), modelNm, METHOD.CREATE)
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

export default GralhqlHelper
