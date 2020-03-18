import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import models from './core/models/index'
import graphQLSchema from './graphQLSchema'
import middlewareGlobal from './core/middleware'
// import logger from "./utils/logger";
// import uuidv4 from 'uuid/v4';

// load env
dotenv.config()
const app = express()

// Setup middleware global
middlewareGlobal(app)

// public logs
app.use('/logs', express.static(path.join(__basedir, '.logs')))

const server = new ApolloServer({
  ...graphQLSchema,
  context: async ({ req }) => {
    if (req) {
      return {
        SECRET: process.env.SECRET || 'dong_nguyen',
        req,
        models: models
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 3000 }, () => {
  console.log('Apollo Server on http://localhost:3000/graphql')
  // console.clear();
})
