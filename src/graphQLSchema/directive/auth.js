import jwt from 'jsonwebtoken'
import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import { AuthenticationError } from 'apollo-server'

const getUser = async (req) => {
    const token = req.headers['token'];
    if (token) {
        try {
            return await jwt.verify(token, 'riddlemethis');
        } catch (e) {
            throw new AuthenticationError('Your session expired. Sign in again.')
        }
    }
}
/**
 * args[2] = context
 * @see(@link https://www.apollographql.com/docs/graphql-tools/schema-directives/)
 *  @autha(requires: ADMIN)
 */
export default {
    auth: class AuthDirective extends SchemaDirectiveVisitor {
        visitObject(type) {
            this.ensureFieldsWrapped(type);
            type._requiredAuthRole = this.args.requires;
        }
        // Visitor methods for nested types like fields and arguments
        // also receive a details object that provides information about
        // the parent and grandparent types.
        visitFieldDefinition(field, details) {
            this.ensureFieldsWrapped(details.objectType);
            field._requiredAuthRole = this.args.requires;
        }

        ensureFieldsWrapped(objectType) {
            // Mark the GraphQLObjectType object to avoid re-wrapping:
            if (objectType._authFieldsWrapped) return;
            objectType._authFieldsWrapped = true;

            const fields = objectType.getFields();

            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (...args) {
                    // Get the required Role from the field first, falling back
                    // to the objectType if no Role is required by the field:
                    const requiredRole =
                        field._requiredAuthRole ||
                        objectType._requiredAuthRole;
                    if (!requiredRole) {
                        return resolve.apply(this, args);
                    }

                    const [, , ctx, info] = args;
                    const me = await getUser(ctx.req);
                    // if (!user.hasRole(requiredRole)) {
                    //     throw new Error("not authorized");
                    // }
                    if (!me) {
                        throw new AuthenticationError("You are not authenticated");
                    }
                    args[2].me = me;
                    return resolve.apply(this, args);
                };
            });
        }
    }
}
