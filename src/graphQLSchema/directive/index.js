import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolversArray = fileLoader(path.join(__dirname, './*.directive.js'), { extensions: ['.js'], ignoreIndex: true });

export default mergeResolvers(resolversArray, { all: true });