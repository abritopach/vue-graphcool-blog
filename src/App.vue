<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

@Component
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
  margin-top: 60px;
}
</style>
