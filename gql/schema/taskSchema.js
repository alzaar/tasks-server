export default `
type Task {
  id: String!
  name: String!
  description: String!
}

type Response {
  total: String
  tasks: [Task]
  message: String
}

type Query {
  getTasks(
    id: String
    name: String
    description: String
    page: String
  ): Response!
}

type Mutation {
  addTask(
    name: String!
    description: String!
  ): Response!
}

type Mutation {
  removeTask(
    id: String
  ): Response!
}
`