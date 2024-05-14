import { gql} from '@apollo/client';

// Query to fetch all products
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout($lineItems: [LineItemInput!]!) {
    checkout(lineItems: $lineItems) {
      sessionId
    }
  }
`;


export const ADD_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;