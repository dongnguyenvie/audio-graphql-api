import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolversArray = fileLoader(path.join(__dirname, '.'), { extensions: ['.js'], ignoreIndex: true });

export default mergeResolvers(resolversArray, { all: true });