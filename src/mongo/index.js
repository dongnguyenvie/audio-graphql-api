import path from 'path'
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'

const modelsArray = fileLoader(path.join(__dirname, './models'))

export const models = mergeResolvers(modelsArray, { all: true })

