import 'isomorphic-fetch'
import sharify from 'sharify'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { setContext } from 'apollo-link-context'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { HelmetProvider } from 'react-helmet-async'

import mount from 'v2/util/mount'

import { Themed } from 'v2/styles/theme'

import introspectionQueryResultData from 'v2/apollo/fragmentTypes.json'

import clientData from 'v2/apollo/localState/clientData'

const isClientSide = typeof window !== 'undefined'

const {
  data: { GRAPHQL_ENDPOINT, CLIENT_GRAPHQL_ENDPOINT },
} = sharify

const clientHttpLink = new BatchHttpLink({ uri: CLIENT_GRAPHQL_ENDPOINT })
const serverHttpLink = new BatchHttpLink({ uri: GRAPHQL_ENDPOINT })

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export const initApolloClient = ({
  token: X_AUTH_TOKEN,
  currentRoute,
  isLoggedIn,
  cookies,
  serializedMe,
  sharifyData,
}: any = {}) => {
  if (isClientSide && window.__APOLLO_CLIENT__) {
    return window.__APOLLO_CLIENT__
  }

  const cache = new InMemoryCache({ fragmentMatcher })

  if (isClientSide && window.__APOLLO_STATE__) {
    cache.restore(window.__APOLLO_STATE__)
  }

  const { X_APP_TOKEN, X_SHARE_TOKEN } = sharifyData

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(X_AUTH_TOKEN && { 'X-AUTH-TOKEN': X_AUTH_TOKEN }),
      ...(X_APP_TOKEN && { 'X-APP-TOKEN': X_APP_TOKEN }),
      ...(X_SHARE_TOKEN && { 'X-SHARE-TOKEN': X_SHARE_TOKEN }),
    },
  }))

  const httpLink = isClientSide ? clientHttpLink : serverHttpLink

  const link = ApolloLink.from([authLink, httpLink])

  const typeDefs = `
    extend type Query {
      cookies: {
        get(name: String!): Boolean | null
      }
      sharify: {
        get(name: String!): Boolean | null
      }
    }
  `

  const resolvers = {
    Query: {
      cookies: () => ({
        __typename: 'Cookies',
      }),
      sharify: () => ({
        __typename: 'Sharify',
      }),
      serializedMe: () => ({
        __typename: 'SerializedMe',
      }),
    },
    Cookies: {
      get: (_obj, args) => {
        return cookies[args.name] || null
      },
    },
    Sharify: {
      get: (_obj, args) => {
        const value = sharifyData[args.name]
        return value === undefined ? null : value
      },
    },
  }

  const client = new ApolloClient({
    ssrMode: !isClientSide,
    link,
    cache,
    resolvers,
    typeDefs,
  })

  const data = {
    currentRoute: {
      __typename: 'CurrentRoute',
      ...currentRoute,
    },
    loginStatus: {
      __typename: 'LoginStatus',
      isLoggedIn,
    },
    cookies: {
      __typename: 'Cookies',
    },
    serializedMe: {
      __typename: 'SerializedMe',
      ...{
        id: null,
        name: null,
        initials: null,
        avatar: null,
        authentication_token: null,
        is_premium: null,
        ...serializedMe,
      },
    },
    sharify: {
      __typename: 'Sharify',
      ...{ ...sharifyData, CURRENT_USER: null },
    },
  }

  cache.writeData({
    data,
  })

  if (isClientSide) {
    window.__APOLLO_CLIENT__ = client
  }

  return client
}

export const initClientSideApolloClient = () => initApolloClient(clientData())

if (isClientSide) {
  initClientSideApolloClient()
}

export const wrapWithProviders = (
  client = isClientSide && window.__APOLLO_CLIENT__,
  helmetContext = {}
) => (Component, props = {}) => (
  <HelmetProvider context={helmetContext}>
    <ApolloProvider client={client}>
      <Themed>
        <Component {...props} />
      </Themed>
    </ApolloProvider>
  </HelmetProvider>
)

export const mountWithApolloProvider = (Component, props = {}, mountNode) => {
  if (!mountNode) return null

  const client = initClientSideApolloClient()
  const WrappedComponent = wrapWithProviders(client)(Component, props)

  return mount(WrappedComponent, mountNode)
}
