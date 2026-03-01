import { gql } from "@apollo/client";

export const GET_CART = gql`
  query {
    getCart {
      id
      name
      count
      price
      totalPrice
      image
    }
  }
`;
