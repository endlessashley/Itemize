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

export const ADD_SKILL = gql`
  mutation addSkill($userId: ID!, $skill: String!) {
    addSkill(userId: $userId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const ADD_NOVEL = gql`
  mutation addNovel($author: String!, $name: String!, $rank: Int, $isComplete: Boolean) {
    addNovel(author: $author, name: $name, rank: $rank, isComplete: $isComplete) {
      name
      author
      rank
      isComplete
    }
  }
`;

export const ADD_NEW_NOVEL = gql`
mutation addNewNovel ($userId: ID!, $novelInput: NovelInput!) {
  addNewNovel(userId: $userId, novelInput: $novelInput) {
   name
   author
   rank
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
  mutation removeNovel($name: String!, $author: String!, $rank: String!, $isComplete: Boolean!) {
    removeNovel(name: $name, author: $author, rank: $rank, isComplete: $isComplete) {
      _id
      name
      novels
    }
  }
`;
