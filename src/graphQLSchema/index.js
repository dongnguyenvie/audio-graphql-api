import resolvers from './resolvers'
import typeDefs from './types'
import schemaDirectives from './directive'

const graphQLSchema = {
  typeDefs,
  resolvers,
  schemaDirectives
}

export default graphQLSchema
