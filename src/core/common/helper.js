import _ from 'lodash'
import graphqlFields from 'graphql-fields'
import config from '../../../config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
  static getProjection(info, rootField = 'result') {
    const schema = this.getSchema(_.get(graphqlFields(info), rootField))

    // let projection = Object.keys(rootField ? _.get(graphqlFields(info), rootField) : graphqlFields(info))

    // if (_.isArray(projection) && !_.isEmpty(projection)) {
    //   projection = projection.join(' ')
    // } else {
    //   projection = ''
    // }

    return schema
  }

  static getPopulateSchema(info, rootField = 'result') {
    const schema = this.getSchema(_.get(graphqlFields(info), rootField))
    return schema;
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

  static testABC(info, rootField = 'result') {
    const a = this.getSchema(_.get(graphqlFields(info)))
    console.log(a)
    const requestSchema = _.get(graphqlFields(info), rootField)
    let querySchema = {}
    let projection1 = {}
    Object.keys(requestSchema).forEach(key => {
      if (_.isEmpty(requestSchema[key])) {
        projection1[key] = requestSchema[key]
      } else {
        querySchema[key] = requestSchema[key]
      }
    })
    querySchema['projection'] = requestSchema[key]
    let projection = Object.keys(rootField ? _.get(graphqlFields(info), rootField) : graphqlFields(info))

    if (_.isArray(projection) && !_.isEmpty(projection)) {
      projection = projection.join(' ')
    } else {
      projection = ''
    }

    return projection
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
    console.log(populate)
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
    const { email, fullName, id, phone, username, role } = payload
    const token = jwt.sign({ email, fullName, id, phone, username }, secret, {
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
  static getAuth(req = {}, secret) {
    if (req.session && req.session.user) {
      return req.session.user
    } else if (req.headers && req.headers['token']) {
      return this.parseToken(req.headers['token'], secret)
    }
  }
}
export default Helper
