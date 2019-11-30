// const { SchemaDirectiveVisitor } = require('apollo-server');
// const { defaultFieldResolver } = require('graphql');

// const getUser = async (ctx) => {
//     const token = ctx.headers['token'];
//     if (token) {
//         try {
//             return await jwt.verify(token, 'riddlemethis');
//         } catch (e) {
//             console.log(`hehehee`)
//             throw new AuthenticationError('Your session expired. Sign in again.')
//         }
//     }
// }

// export default {
//     me: class Me extends SchemaDirectiveVisitor {
//         visitFieldDefinition(field) {
//             const { resolve = defaultFieldResolver } = field;
//             field.resolve = async function (...args) {
//                 const context = args[2]
//                 const me = await getUser(context);
//                 context.me = me;
//                 const result = await resolve.apply(this, args);
//                 return result;
//             };
//         }
//     }
// }