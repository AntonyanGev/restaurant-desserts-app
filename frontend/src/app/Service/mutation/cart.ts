import { gql } from "@apollo/client";

export const CONFIRM_ORDER = gql`
  mutation confirmOrder($items: [CartInput]) {
    confirmOrder(items: $items) {
      id
      name
      count
      price
      totalPrice
      image
    }
  }
`;

export const DELETE_CART_DATA = gql`
  mutation {
    deleteCartData
  }
`;
