// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'

// GRAPHQL.
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

// VUEX
import store from './store';

import moment from 'moment';

const SIMPLE_API_ENDPOINT = 'https://api.graph.cool/simple/v1/cje2ponq50idi01357s55y4h2';


// Create an authLink that gets the user token from local storage and return the headers which
// contains the Authorization header.
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from localstorage if it exists.
  const token = localStorage.getItem('blog-app-token')

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

// Create the apollo client.
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})


// Install the vue plugin.
Vue.use(VueApollo)

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('formatDate', function(value: any) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
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
