import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
const typesArray = fileLoader(path.join(__dirname, './*.graphql'));
const types = mergeTypes([linkSchema, ...typesArray], { all: true });

export default types;