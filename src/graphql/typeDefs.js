module.exports = `
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    createAt: String!
  }
  type Query {
    hello : String!
  }
  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }
`
