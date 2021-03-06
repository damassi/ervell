import React from 'react'
import { storiesOf } from '@storybook/react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Specimen from 'v2/stories/__components__/Specimen'
import ChannelContents from 'v2/components/ChannelContents'

import channelContentsFragment from 'v2/components/ChannelContents/fragments/channelContents'

storiesOf('ChannelContents', module).add('default', () => (
  <Specimen>
    <Query
      query={gql`
        {
          channel(id: 999) {
            ...ChannelContents
          }
        }
        ${channelContentsFragment}
      `}
    >
      {({ data, loading, error }) =>
        loading || error ? null : <ChannelContents channel={data.channel} />
      }
    </Query>
  </Specimen>
))
