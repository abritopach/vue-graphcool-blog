<template>
    <v-footer fixed color="primary">
    <div class="white--text">© {{ new Date().getFullYear() }} Adrián Brito Pacheco</div>
    <v-spacer></v-spacer>
    <div class="white--text">
      <a class="github-button" href="https://github.com/abritopach/vue-graphcool-blog" data-icon="octicon-star" aria-label="Star abritopach/vue-graphcool-blog">Star</a>
      <a class="github-button" href="https://github.com/abritopach" aria-label="Follow @abritopach on GitHub">GitHub</a>
    </div>
  </v-footer>
</template>

<script lang="ts" >
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class AppFooter extends Vue {
};
</script>
<style scoped>
  .footer {
    padding-left: 5px!important;
    padding-right: 5px!important;
  }
</style>