import path from 'path'
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas'

const ctrArray = fileLoader(path.join(__dirname, './*.ctr.js'))
const ctrs = mergeResolvers([...ctrArray], { all: true })

export default ctrs
