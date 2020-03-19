import _ from 'lodash'
import { ApolloError, ForbiddenError, SchemaError, SyntaxError, ValidationError, UserInputError, AuthenticationError, toApolloError } from 'apollo-server-express';

const classes = { ApolloError, ForbiddenError, SchemaError, SyntaxError, ValidationError, UserInputError, AuthenticationError };

class ErrorEx {
    static output(message, type = '') {
        if (_.isEmpty(type)) {
            console.log(99999)
            return new Error(message)
        }
        return new classes[type](message)
    }
}

export default ErrorEx;