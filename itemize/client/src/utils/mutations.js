import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;


export const ADD_NOVEL = gql`
  mutation addNovel($author: String, $name: String, $rank: String, $isComplete: String) {
    addNovel(author: $author, name: $name, rank: $rank, isComplete: $isComplete) {
      author
      name
      rank
      isComplete
    }
  }
`;

export const UPDATE_NOVEL = gql`
  mutation updateNovel($_id: ID!, $isComplete: String) {
    updateNovel(_id: $_id, isComplete: $isComplete) {
      _id
      isComplete
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const REMOVE_NOVEL = gql`
  mutation removeNovel($_id: ID!) {
    removeNovel(_id: $_id) {
      _id
    }
  }
`;

export const ADD_NONFICTION = gql`
  mutation addNonfiction($author: String, $name: String, $rank: String, $isComplete: String) {
    addNonfiction(author: $author, name: $name, rank: $rank, isComplete: $isComplete) {
      author
      name
      rank
      isComplete
    }
  }
`;

export const UPDATE_NONFICTION = gql`
  mutation updateNonfiction($_id: ID!, $isComplete: String) {
    updateNonfiction(_id: $_id, isComplete: $isComplete) {
      _id
      isComplete
    }
  }
`;

export const REMOVE_NONFICTION = gql`
  mutation removeNonfiction($_id: ID!) {
    removeNonfiction(_id: $_id) {
      _id
    }
  }
`;