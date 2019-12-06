import modelHeplers from '../../../core/helper/model'
import helper from '../../../core/common/helper'

class auth {
  static getTokens(model, args, { projection, SECRET } = {}, options = {}) {
    // return modelHeplers
  }
  static async login(model, args, { projection, SECRET, isAdminSite = false } = {}, options = {}) {
    const { username, password, rememberMe } = args
    Object.assign(options, {
      defaultDocsFlg: true
    })
    const user = modelHeplers.findOne(model, { username }, '', options)
    // if (user) {

    // }
    // const res = await this.checkAuth({ isAdminSite }, req);
    // if (res.success) {
    //     return res;
    // }
    return {}
  }
  static checkAuth({ token, isAdminSite = false }, req) {
    // const res = await this.checkAuth({ isAdminSite }, req);
  }
}

export { auth }
