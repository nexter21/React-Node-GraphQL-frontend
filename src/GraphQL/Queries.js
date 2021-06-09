import { gql } from "@apollo/client";

export const LOAD_ITEMS = gql`
  query {
    getAllPosts {
      id
      text
    }
  }
`;

export const LOAD_ITEM = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      text
    }
  }
`;
