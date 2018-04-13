// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'

import Meta from 'vue-meta'

// GRAPHQL.
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


// Wait for support of websocket link in apollo-boost.
// import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-boost';

// VUEX
import store from './store';

import moment from 'moment';

// const SIMPLE_API_ENDPOINT = 'https://api.graph.cool/simple/v1/cje2ponq50idi01357s55y4h2';
const SIMPLE_API_ENDPOINT = 'http://localhost:4000/';

// Create an authLink that gets the user token from local storage and return the headers which
// contains the Authorization header.
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from localstorage if it exists.
  const token = localStorage.getItem('blog-app-token');

  // Return the headers to the context so httpLink can read them.
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : null
      }
  }
})

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here.
  uri: SIMPLE_API_ENDPOINT
})

// Create the subscription websocket link.
const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cje2ponq50idi01357s55y4h2',
  options: {
    reconnect: true,
  },
})

// Using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent.
const link = split(
  // Split based on operation type.
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

// Create the apollo client.
const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})


// Vue.use(Meta)

// Install the vue plugin.
Vue.use(VueApollo)

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('formatDate', function(value: any) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
  return '';
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
