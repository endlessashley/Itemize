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
    }
  }
`;


export const QUERY_USER = gql`
query user
  {
    user {
      firstName
      lastName
      readBooks {
        _id 
        readDate
        bookId
          name
          author
          points
      }
    }
  }
`;