import { ApolloError } from 'apollo-server';
import { GraphQLScalarType, GraphQLError } from 'graphql';
import _ from 'lodash';

export class CustomType extends GraphQLScalarType {

    /**
     * 
     * @param {*} type 
     * @param {*} name 
     * @param {*} args 
     */
    constructor(type, name, args) {
        const self = CustomType;
        super({
            name: `Validate`,
            discription: `Validate field ${name}`,
            // For more information about GraphQLScalar type (de)serialization,
            // see the graphql-js implementation:
            // https://github.com/graphql/graphql-js/blob/31ae8a8e8312/src/type/definition.js#L425-L446

            // value from the client
            serialize(value) {
                value = type.serialize(value);
                self.validate(value, name, args);
                return value;
            },

            // value sent to the client
            parseValue(value) {
                value = type.serialize(value);
                self.validate(value, name, args);
                return type.parseValue(value);
            },

            // ast value is always in string format
            parseLiteral(ast) {
                const value = type.parseLiteral(ast);
                self.validate(value, name, args);
                return type.parseLiteral(ast);
            }
        });
    }

    /**
     * 
     * @param {Any} value 
     * @param {fieldNm} name 
     * @param {Object} param2 
     * @param {String} param2.schema
     * @param {Array} param2.condition
     */
    static validate(value, name, { schema = "", condition = [] }) {
        condition.forEach(({ key }) => {
            if (_[key] && _[key](value)) {
                throw new this.ValidationError(`${name} không hợp lệ`, {
                    arg: name,
                    value
                });
            }
        })
        // if (schema && value) {
        //     if (!validate[schema][name](value)) {
        //         throw new ValidationError(`${name} không hợp lệ`, {
        //             arg: name,
        //             value
        //         });
        //     }
        // }
    }
    static ValidationError(message, arg) {
        return new ApolloError(message, 'GRAPHQL_VALIDATION_ERROR', arg);
    };
}
