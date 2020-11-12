import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
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
`;

export const CHECK_AUTHORIZATION = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;