// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const SIMPLE_API_ENDPOINT = 'https://api.graph.cool/simple/v1/cje2ponq50idi01357s55y4h2';

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here.
  uri: SIMPLE_API_ENDPOINT
})

// Create the apollo client.
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})


// Install the vue plugin.
Vue.use(VueApollo)

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
