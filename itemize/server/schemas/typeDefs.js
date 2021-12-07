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
    rank: Int
    isComplete: Boolean
  }

  input NovelInput {
    _id: ID
    name: String!
    author: String!
    rank: String!
    isComplete: Boolean
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    novel (_id: ID!): Novel
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addNovel(name: String, author: String, rank: Int, isComplete: Boolean): Novel

    addNewNovel(userId: ID!, novelInput: NovelInput!): User


    addSkill(userId: ID!, skill: String!): User
    removeUser: User
    removeNovel(name: String!, author: String!, rank: String!, isComplete: Boolean!): User

   




  }
`;

module.exports = typeDefs;
