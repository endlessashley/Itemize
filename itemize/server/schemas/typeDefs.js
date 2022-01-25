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
    _id: ID!
    name: String
    author: String
    rank: String
    isComplete: String
    owner: String
  }

  type Nonfiction {
    _id: ID
    name: String
    author: String
    rank: String
    isComplete: String
  }

  type CurrentBook {
    _id: ID
    name: String
    totalPages: String
    pagesRead: String
  }

  type Query {
    users: [User]
    user: User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    novel (_id: ID): Novel
    novels (owner: String): [Novel]
    nonfiction (nonfictionId: ID!): Nonfiction
    nonfictions: [Nonfiction]
    currentBooks: [CurrentBook]
    currentBook (currentBookId: ID!): CurrentBook
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNovel(name: String, author: String, rank: String, isComplete: String): Novel
    updateNovel(_id: ID!, name: String, author: String, rank: String, isComplete: String): Novel
    removeUser: User
    removeNovel(novelId: ID!): Novel
    addNonfiction(name: String, author: String, rank: String, isComplete: String): Nonfiction
    updateNonfiction(_id: ID!, name: String, author: String, rank: String, isComplete: String): Nonfiction
    removeNonfiction(_id: ID!): Nonfiction
    addCurrentBook(name: String, totalPages: String, pagesRead: String): CurrentBook
    updateCurrentBook(_id: ID!, name: String, totalPages: String, pagesRead: String): CurrentBook
    removeCurrentBook(_id: ID!): CurrentBook
  }
`;

module.exports = typeDefs;
