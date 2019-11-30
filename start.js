// Reference by Post: https://www.robinwieruch.de/graphql-apollo-server-tutorial
// (parent, args, context, info) => { ... }
// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
// refs https://dev.to/alvarojsnish/graphql-mongodb-the-easy-way-ngc
// Dev chrome://inspect
// Session: https://medium.com/front-end-weekly/make-sessions-work-with-express-js-using-mongodb-62a8a3423ef5
global.__basedir = __dirname

require('@babel/register')({
  presets: ['@babel/preset-env']
})
require('@babel/polyfill')
// Import the rest of our application.
module.exports = require('./src/index.js')
