import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        user 
        token
    }
  }
`;

export const SIGNUP  = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
        token
        }
    }
`;



