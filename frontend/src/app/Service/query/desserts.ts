import { gql } from "@apollo/client";

export const GET_ALL_DESSERTS = gql`
  query {
    getAllDesserts {
      id
      name
      price
      type
      action
      count
      images {
        thumbnail
        mobile
        tablet
        desktop
      }
    }
  }
`;
