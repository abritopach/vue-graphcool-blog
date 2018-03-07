<template>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media src="https://previews.123rf.com/images/pongmoji/pongmoji1509/pongmoji150900590/45573900-red-brick-wall-texture-background-with-a-word-access-denied.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Access Denied</h3>
            <div>You do not have access to the section you requested.</div>
          </div>
        </v-card-title>
        <v-card-actions>
            <router-link to="/">
                <v-btn flat color="primary">Return to Home</v-btn>
            </router-link>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts" >
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Denied extends Vue {
};
</script>
<style scoped>
    .card {
        border: 5px solid red;
    }
</style>