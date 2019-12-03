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
    const projection = Object.keys(_.get(graphqlFields(info), 'result'))
    return projection.join(' ')
  }
}
export default Helper
