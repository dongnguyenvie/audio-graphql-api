const { SchemaDirectiveVisitor } = require('apollo-server')
// const { defaultFieldResolver } = require('graphql')
import { GraphQLNonNull, GraphQLScalarType } from 'graphql'
import { CustomType } from '../resolvers/scalar/customType'
// import EmailType from '../directive/email'
class validate extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    this.wrapType(field)
  }

  visitInputFieldDefinition(field) {
    this.wrapType(field)
  }

  visitArgumentDefinition(arg, details) {
    this.wrapType(arg)
  }

  wrapType(field) {
    const fieldName = field.name;
    if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
      field.type = new GraphQLNonNull(new CustomType(field.type.ofType, fieldName, this.args));
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new CustomType(field.type, fieldName, this.args);
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}
export default { validate }
