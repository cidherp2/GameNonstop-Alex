import { gql } from '@apollo/client';

// Query to fetch all products
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      image
      price
      category
    }
  }
`;