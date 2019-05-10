import gql from 'graphql-tag'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'

export const channelFollowersQuery = gql`
  query ChannelFollowers($id: ID!, $page: Int, $per: Int) {
    channel(id: $id) {
      followers(page: $page, per: $per) {
        __typename
        ...IdentifiableCell
      }
    }
  }
  ${identifiableCellFragment}
`
