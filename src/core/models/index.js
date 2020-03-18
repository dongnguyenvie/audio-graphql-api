import path from 'path'
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'

const modelsArray = fileLoader(path.join(__dirname, './schemas'))

export default mergeResolvers(modelsArray, { all: true })

