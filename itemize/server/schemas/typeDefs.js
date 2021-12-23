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

  type Nonfiction {
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
    novel (novelId: ID!): Novel
    novels: [Novel]
    nonfiction (nonfictionId: ID!): Nonfiction
    nonfictions: [Nonfiction]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNovel(name: String, author: String, rank: String, isComplete: String): Novel
    updateNovel(_id: ID!, name: String, author: String, rank: String, isComplete: String): Novel
    removeUser: User
    removeNovel(_id: ID!): Novel
    addNonfiction(name: String, author: String, rank: String, isComplete: String): Nonfiction
    updateNonfiction(_id: ID!, name: String, author: String, rank: String, isComplete: String): Nonfiction
    removeNonfiction(_id: ID!): Nonfiction
  }
`;

module.exports = typeDefs;
