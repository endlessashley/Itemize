import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      novels
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
query singleUser
{
  user {
    _id
    name
    novels {
      _id
      name
      author
      rank
      isComplete
    }
  }
}
`;

export const QUERY_SINGLE_NOVEL = gql`
query getNovel ($_id: ID)
{
  novels(_id: $_id) {
    _id
    name
    author
    rank
    isComplete
  }
}
`;



export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      novels {
        _id
        name
        author
        rank
        isComplete
      }
    }
  }
`;

export const QUERY_NOVELS = gql`
  query novels {
    novels {
      _id
      author
      name
      rank
      isComplete
      owner
    }
  }
`;

export const QUERY_NONFICTIONS = gql`
  query nonfictions {
    nonfictions {
      _id
      author
      name
      rank
      isComplete
    }
  }
`;

export const QUERY_CURRENT_BOOKS = gql`
  query currentBooks {
    currentBooks {
      _id
      name
      totalPages
      pagesRead
    }
  }
`;




