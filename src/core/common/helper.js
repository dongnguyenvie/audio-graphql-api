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

  static getProjection(info) {
    let projection = Object.keys(_.get(graphqlFields(info), 'result'))
    if (_.isArray(projection) && !_.isEmpty(projection)) {
      projection = projection.join(' ')
    } else {
      projection = ''
    }
    console.log(`projection`, projection)
    return projection
  }
}
export default Helper
