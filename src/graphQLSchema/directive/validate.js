const { SchemaDirectiveVisitor } = require('apollo-server')
// const { defaultFieldResolver } = require('graphql')
import { GraphQLNonNull, GraphQLScalarType } from 'graphql'
// import EmailType from '../directive/email'
export default {
  validate: class Validate extends SchemaDirectiveVisitor {
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
      if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
        // field.type = new GraphQLNonNull(new EmailType(field.type.ofType))
      } else if (field.type instanceof GraphQLScalarType) {
        // field.type = new EmailType(field.type)
      } else {
        throw new Error(`Not a scalar type: ${field.type}`)
      }
    }
  }
}
