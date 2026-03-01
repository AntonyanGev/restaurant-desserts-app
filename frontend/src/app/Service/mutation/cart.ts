import { gql } from "@apollo/client";

export const CREATE_CART_ITEM = gql`
  mutation createCartItem($input: CartInput) {
    createCartItem(input: $input) {
      name
      count
      price
      totalPrice
      image
    }
  }
`;
export const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($id: ID!, $input: CartInput) {
    updateCartItem(id: $id, input: $input) {
      name
      count
      price
      totalPrice
      image
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation deleteCartItem($id: ID!) {
    deleteCartItem(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_CART_DATA = gql`
  mutation {
    deleteCartData
  }
`;
