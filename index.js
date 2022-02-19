import { ApolloServer } from 'apollo-server'
import 'dotenv/config'
import { Client } from '@elastic/elasticsearch'
import Schema from './gql'
import { tasksParser } from './utils'
const client = new Client({ node: process.env.DATABASE })

const server = new ApolloServer({
  schema: Schema,
  context: () => {
    return {
    esClient: client,
    tasksParser: tasksParser
    }
  }
})

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});