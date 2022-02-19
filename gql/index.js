import { makeExecutableSchema } from '@graphql-tools/schema'

import tasksSchema from './schema/taskSchema'
import tasksResolver from './resolvers/tasksResolver'

const Schema = makeExecutableSchema({
  typeDefs: [tasksSchema],
  resolvers: [tasksResolver]
})

export default Schema