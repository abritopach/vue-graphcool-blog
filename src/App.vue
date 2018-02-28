<template>
  <div id="app">
    <v-app>
      <!-- Render the Navbar component. -->
      <app-navbar></app-navbar>
      <v-card-text>
        Sample project that shows how to build a Blog App with VueJS, GraphQL, Apollo Client and Graphcool.
      </v-card-text>
      <v-card-text>
        <img src="./assets/graphql_apollo_vue_graphcool.png">    
      </v-card-text>
      <router-view/>
      <!-- Render the Footer component. -->
      <app-footer></app-footer>
    </v-app>
  </div>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'
import AppNavbar from './components/common/AppNavbar.vue'
import AppFooter from './components/common/AppFooter.vue'

@Component({
  components: {
    // Add a reference to components in the components property.
    AppNavbar,
    AppFooter
  }
})
export default class App extends Vue {

  // https://scotch.io/tutorials/build-a-blog-with-vue-graphql-and-apollo-client
  // https://alexjoverm.github.io/2017/06/28/Integrate-TypeScript-in-your-Vue-project/
  // https://johnpapa.net/vue-typescript/
  
  constructor() {
    super();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
