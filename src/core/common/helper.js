import _ from 'lodash'
import graphqlFields from 'graphql-fields'
import config from '../../../config'
import bcrypt from 'bcrypt'
class Helper {
  static rename(oldProp, newProp, { [oldProp]: old, ...others }) {
    return {
      [newProp]: old,
      ...others
    }
  }
  static mapToIndexDoc(obj) {
    return this.rename('id', '_id', _.cloneDeep(obj))
  }

  static getProjection(info, rootField = 'result') {
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

    return fieldsPopulate.reduce((acc, populateNm) => {
      acc[populateNm] = getPopulate(field, populateNm)
      return acc
    }, {})
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
}
export default Helper
