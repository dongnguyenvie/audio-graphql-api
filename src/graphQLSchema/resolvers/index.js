import path from "path";
import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
// JSON scalar
import GraphQLJSON from 'graphql-type-json';

const queriesAndMultationsArray = fileLoader(path.join(__dirname, "./mutations-queries/*.mq.js"));
const rootQueriesArray = fileLoader(path.join(__dirname, "./root-queries"));
const scalarArray = fileLoader(path.join(__dirname, "./*.scalar.js"));

const queriesAndMultations = mergeResolvers(queriesAndMultationsArray, { all: true });
const rootQueries = mergeResolvers(rootQueriesArray, { all: true });
const scalarQueries = mergeResolvers(scalarArray, { all: true });

const resolvers = {
  JSON: GraphQLJSON,
  ...scalarQueries,
  ...queriesAndMultations,
  ...rootQueries
};

export default resolvers;
