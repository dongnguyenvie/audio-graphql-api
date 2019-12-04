import _ from 'lodash'
import graphqlFields from 'graphql-fields'

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
}
export default Helper
