import { GraphQLScalarType, GraphQLString } from 'graphql'
const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export default class EmailType extends GraphQLScalarType {
  constructor(type) {
    super({
      name: 'Email',
      parseValue: value => type.parseValue(value),
      serialize: value => type.serialize(value),
      parseLiteral: ast => {
        if (emailRegEx.test(ast.value)) {
          return type.parseLiteral(ast)
        }
        throw new ApolloError('Email address failed validation', 'INVALID_EMAIL')
      }
    })
  }
}
export const Email = new EmailType(GraphQLString)
