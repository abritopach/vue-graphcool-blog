<template>
  <v-app>
    <!-- Render the Navbar component. -->
    <app-navbar></app-navbar>
    <div class="main">
      <v-card-text>
        <h1>Sample project that shows how to build a Blog App with VueJS, GraphQL, Apollo Client and Graphcool.</h1>
      </v-card-text>
      <v-card-text>
        <img v-if="$vuetify.breakpoint.xsOnly" src="./assets/graphql_apollo_vue_graphcool.png" width="100%" alt="Technologies Logo">  
        <img v-if="!$vuetify.breakpoint.xsOnly" src="./assets/graphql_apollo_vue_graphcool.png" alt="Technologies Logo">  
      </v-card-text>
      <router-view/>
        <v-snackbar :color="snackbar.color" v-model="snackbar.show" :timeout="snackbar.timeout">
          {{ snackbar.text }}
          <v-btn dark flat @click.native="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </div>
    <!-- Render the Footer component. -->
    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'
import AppNavbar from './components/common/AppNavbar.vue'
import AppFooter from './components/common/AppFooter.vue'

import EventBus from './event.bus';

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
  
  snackbar: any = {show: false, color: "primary", timeout: 6000, text: ""}; 

  constructor() {
    super();

    EventBus.$on('SHOW_SNACKBAR', (snackbar: any) => {
      // console.log("show snackbar", snackbar);
      const {show, color, text} = snackbar;
      this.snackbar.show = show;
      this.snackbar.color = color;
      this.snackbar.text = text;
    });
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
  .main {
    margin-bottom: 48px;
  }
  .badge__badge {
    top: 15px;
    right: 8px;
    color: white;
  }
  li:last-child .breadcrumbs__item {
    color: #1976d2!important;
  }
  .card__media__background {
    margin-top: 10px;
  }
  #disqus_thread {
    overflow: hidden;
  }
  #disqus_thread iframe {
    margin-bottom: -54px;
  }
</style>
