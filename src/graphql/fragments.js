import { gql } from 'apollo-boost';

export const REPO_FRAGMENT = gql`
  fragment RepoFields on Repository {
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
`
;