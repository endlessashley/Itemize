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
    owner: String
  }

  type CurrentBook {
    _id: ID
    name: String
    totalPages: String
    pagesRead: String
    owner: String
  }

  type Query {
    users: [User]
    user: User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    novel (_id: ID): Novel
    novels (owner: String): [Novel]
    nonfiction (nonfictionId: ID!): Nonfiction
    nonfictions (owner: String): [Nonfiction]
    currentBooks (owner: String): [CurrentBook]
    currentBook (currentBookId: ID!): CurrentBook
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser: User

    addNovel(name: String, author: String, rank: String, isComplete: String): Novel
    addNonfiction(name: String, author: String, rank: String, isComplete: String): Nonfiction
    addCurrentBook(name: String, totalPages: String, pagesRead: String): CurrentBook

    updateNovel(_id: ID!, name: String, author: String, rank: String, isComplete: String): Novel
    updateNonfiction(_id: ID!, name: String, author: String, rank: String, isComplete: String): Nonfiction
    updateCurrentBook(_id: ID!, name: String, totalPages: String, pagesRead: String): CurrentBook
   
    removeNovel(novelId: ID!): Novel
    removeNonfiction(nonfictionId: ID!): Nonfiction
    removeCurrentBook(currentBookId: ID!): CurrentBook
  }
`;

module.exports = typeDefs;
