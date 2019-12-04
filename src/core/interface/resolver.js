import _ from 'lodash'

/**
 * This is resolver helper for build fast resolver
 * Ex: const roleResolver = new Resolver('role', ['update', 'delete', 'get'])
 * But this function can't working yet
 */
class Resolver {
    constructor(fieldNm, methods) {
        this.fieldNm = fieldNm
        if (_.isArray(methods)) {
            methods.forEach(methodNm => {
                this[this.getMethodNm(methodNm)] = async (root, args, context, info) => { }
            })
        }
    }
    getFieldNm() {
        return _.lowerCase(this.fieldNm)
    }
    getMethodNm(method) {
        return `${method}${_.startCase(this.fieldNm)}`
    }
    get() {
        let Query = {}
        let Mutation = {}
        Object.keys(this).forEach(key => {
            if (key.endsWith(_.startCase(this.fieldNm)) && key.startsWith('get')) {
                Query[key] = this[key]
            } else if (key.endsWith(_.startCase(this.fieldNm))) {
                Mutation[key] = this[key]
            }
        })
        return {
            Query,
            Mutation
        };
    }

}

export default Resolver;
