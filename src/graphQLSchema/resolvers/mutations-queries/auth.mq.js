import ctrs from '../controller'

const FIELD = 'user'
export default {
    Query: {
        login: (_, args, { models, me, SECRET, req }, info) => {
            const conditions = args[FIELD]
            return ctrs['auth'].login(models[FIELD], conditions, { SECRET, req })
        }
    },
    Mutation: {

    }
}
