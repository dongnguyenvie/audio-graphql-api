const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

export default {
    upper: class UpperCase extends SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (...args) {
                const result = await resolve.apply(this, args);
                if (typeof result === 'string') {
                    return result.toUpperCase();
                }
                return result;
            };
        }
    }
}