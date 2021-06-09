import { gql } from "@apollo/client";

export const CREATE_ITEM_MUTATION = gql`
  mutation createPost($text: String!) {
    createPost(text: $text) {
      text
    }
  }
`;

export const EDIT_ITEM_MUTATION = gql`
  mutation updatePost($id: ID!, $newText: String!) {
    updatePost(id: $id, newText: $newText) {
      text
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
