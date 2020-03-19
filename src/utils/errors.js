import _ from 'lodash'
import { ApolloError, ForbiddenError, SchemaError, SyntaxError, ValidationError, UserInputError, AuthenticationError, toApolloError } from 'apollo-server-express';

const classes = { ApolloError, ForbiddenError, SchemaError, SyntaxError, ValidationError, UserInputError, AuthenticationError };

class ErrorEx {
    static show(message, type = '') {
        if (_.isEmpty(type)) {
            throw new Error(message)
        }
        throw new classes[type](message)
    }
}

export default ErrorEx;