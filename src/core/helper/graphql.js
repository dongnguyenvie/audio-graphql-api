const METHOD = {
  CREATE: 'CREATE',
  GET: 'GET',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

export default class Graphqlresponse {
  static getModelName(model) {
    return model.collection.collectionName
  }
  static async response(dataAsync, model, methodNm) {
    let response = {}
    try {
      const data = await dataAsync
      response.success = true
      response.result = data
    } catch (error) {
      response.success = false
      response.message = `${methodNm} ${this.getModelName(model)} failed!`
    }
    return response
  }
  static create(dataAsync, model) {
    return this.response(dataAsync, model, METHOD.CREATE)
  }
  static get(dataAsync, model) {
    return this.response(dataAsync, model, METHOD.GET)
  }
  static update(dataAsync, model) {
    return this.response(dataAsync, model, METHOD.UPDATE)
  }
  static delete(dataAsync, model) {
    return this.response(dataAsync, model, METHOD.DELETE)
  }
}
