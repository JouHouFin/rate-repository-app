import { gql } from 'apollo-boost';
import { REPO_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query ($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepoFields
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
  query ($first: Int, $after: String, $id: ID!) {
    repository(id: $id) {
          ...RepoFields
      url
      reviews (first: $first, after: $after){
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }${REPO_FRAGMENT}
`;


export const CHECK_AUTHORIZATION = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;