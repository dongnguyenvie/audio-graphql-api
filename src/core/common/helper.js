import _ from 'lodash'
import graphqlFields from 'graphql-fields'
import config from '../../../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const mapFieldNmToTableNm = {
  role: 'roles',
  user: 'users',
}

class Helper {
  static rename(oldProp, newProp, { [oldProp]: old, ...others }) {
    return {
      [newProp]: old,
      ...others
    }
  }
  static mapToIndexDoc(obj) {
    obj._id = obj.id
    return obj
    // return this.rename('id', '_id', _.cloneDeep(obj))
  }

  /**
   *
   * @param {*} info
   * @param {*} rootField
   */
  static getPopulateSchema(info, rootField = 'result') {
    const schema = this.getSchema(_.get(graphqlFields(info), rootField))
    return schema
  }

  /**
   *
   * @param {*} user
   */
  static mapUserSession(user) {
    const { roles, id, username, fullName, avatar, email, phone } = user
    const _user = { id, username, fullName, avatar, email, phone }
    _user.roles = roles.map(role => role.permission)
    return _user
  }

  static getSchema(query) {
    let schema = {}
    let projection = []
    Object.keys(query).forEach(key => {
      if (_.isEmpty(query[key])) {
        projection.push(key)
      } else {
        schema[key] = this.getSchema(query[key])
      }
    })
    schema.projection = projection.join(' ')
    return schema
  }

  /**
   *
   * @param {*} field
   * @param {*} fieldsPopulate
   */
  static mapPopulate(field, fieldsPopulate) {
    /**
     * @param {Docs} rootDocs
     * @param {Object} args
     * @param {Object} context
     * @param {Model} context.models
     * @param {Model} context.req
     * @param {Object} info
     */
    const getPopulate = (fieldNm, populateFieldNm) => async (rootDocs, args, { models }, info) => {
      const projection = this.getProjection(info, false)
      const docs = await models[fieldNm].findById(rootDocs._id, populateFieldNm).populate(populateFieldNm, projection)
      return !_.isNull(docs) ? docs[populateFieldNm] : []
    }

    let populate = fieldsPopulate.reduce((acc, populateNm) => {
      acc[populateNm] = getPopulate(field, populateNm)
      return acc
    }, {})
    return populate
  }

  /**
   * @see {@link https://www.npmjs.com/package/bcrypt}
   *
   * @param {*} plaintextPassword
   * @param {*} hashedPassword
   */
  static comparePassword(plaintextPassword, hashedPassword) {
    return bcrypt.compareSync(plaintextPassword, hashedPassword)
  }

  /**
   * @param {*} req
   */
  static getCurrentUser(req) {
    if (!req.session.user) {
      throw new Error('getCurrentUser error')
    }
    return req.session.user
  }

  /**
   *
   * @param {*} payload
   * @param {*} secret
   */
  static createToken(payload, secret) {
    const { email, fullName, id, phone, username, avatar, roles } = payload
    const token = jwt.sign({ email, fullName, id, phone, username, avatar, roles }, secret, {
      expiresIn: 60 * 60 * 24 * 7 * 1000
    })
    return token
  }

  /**
   *
   * @param {*} token
   * @param {*} secret
   */
  static parseToken(token, secret) {
    let result = null
    try {
      result = jwt.verify(token, secret)
    } catch (error) {
      return false
    }
    return result
  }

  /**
   *
   * @param {*} param0
   * @param {*} req
   */
  static getAuth(req = {}, secret, session) {
    if (req.session && req.session.user) {
      return req.session.user
    } else if (req.headers && req.headers['token']) {
      const _user = this.parseToken(req.headers['token'], secret)
      if (_user) {
        session.user = _user
        return _user
      }
      return false
    }
  }

  static stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
}
export default Helper
