const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    novels: [Novel]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Novel {
    _id: ID
    name: String
    author: String
    rank: String
    isComplete: String
  }

  type Query {
    users: [User]
    user: User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    novel (_id: ID!): Novel
    novels: Novel
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNovel(name: String, author: String, rank: String, isComplete: String): Novel
    updateNovel(novelId: ID! name: String, author: String, rank: String, isComplete: String): Novel
    removeUser: User
    removeNovel(name: String!, author: String!, rank: String!, isComplete: String): Novel
  }
`;

module.exports = typeDefs;
