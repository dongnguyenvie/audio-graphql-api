import path from "path";
import { fileLoader, mergeResolvers } from "merge-graphql-schemas";

const queriesAndMultationsArray = fileLoader(path.join(__dirname, "./mutations-queries"));
const rootQueriesArray = fileLoader(path.join(__dirname, "./root-queries"));

const queriesAndMultations = mergeResolvers(queriesAndMultationsArray, { all: true });
const rootQueries = mergeResolvers(rootQueriesArray, { all: true });

const resolvers = {
  ...queriesAndMultations,
  ...rootQueries
};

export default resolvers;
