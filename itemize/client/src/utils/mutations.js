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
  mutation updateNovel($novelId: ID!, $isComplete: String) {
    updateNovel(novelId: $novelId, isComplete: $isComplete) {
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
  mutation removeNovel($name: String!, $author: String!, $rank: String!, $isComplete: String!) {
    removeNovel(name: $name, author: $author, rank: $rank, isComplete: $isComplete) {
      _id
      name
      novels
    }
  }
`;
