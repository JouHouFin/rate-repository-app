import { gql } from 'apollo-boost';
import { REPO_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepoFields
          ownerAvatarUrl
        }
        cursor
      }
      pageInfo {
        totalCount
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${REPO_FRAGMENT}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      ...RepoFields
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPO_FRAGMENT}
`;


export const CHECK_AUTHORIZATION = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;