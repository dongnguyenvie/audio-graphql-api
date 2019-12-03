import logger from '../../utils/logger'

const METHOD = {
  CREATE: 'create',
  GET: 'GET',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const DEFAULT_RESPONSE_FLG = false
export default class GraphqlHepler {
  static getModelName(model) {
    return model.collection.collectionName
  }

  static async handleExec(model, args, options, _method) {
    let response = {}
    try {
      const document = await model[_method](args)
      response.success = true
      response.data = document
    } catch (error) {
      const _modelNm = this.getModelName(model)
      response.success = false
      response.message = `${_method} ${_modelNm} failed!`
      logger.error(error)
    }
    return response
  }
  static async handleDefaultExec(model, args, options, _method) {
    let response = null
    try {
      const document = await model[_method](args)
      response = document
    } catch (error) {
      response = false
      logger.error(error)
    }
    return response
  }

  static get (model, args, options = {}, reponseDefaultFlg = DEFAULT_RESPONSE_FLG) {
    // if (!reponseDefaultFlg) {
    //   return this.handleExec(model, args, options, METHOD.CREATE)
    // } else {
    //   return this.handleDefaultExec(model, args, options, METHOD.)
    // }
  }
  static create(model, args, options = {}, reponseDefaultFlg = DEFAULT_RESPONSE_FLG) {
    if (!reponseDefaultFlg) {
      return this.handleExec(model, args, options, METHOD.CREATE)
    } else {
      return this.handleDefaultExec(model, args, options, METHOD.CREATE)
    }
  }
  
  // static findById()
  static get(model, args, options = {}, reponseDefaultFlg = DEFAULT_RESPONSE_FLG) {}
  static update(model, args, options = {}, reponseDefaultFlg = DEFAULT_RESPONSE_FLG) {}
  static delete(model, args, options = {}, reponseDefaultFlg = DEFAULT_RESPONSE_FLG) {}
}
