<template>
   <section v-if="allPosts">
        <h2>Latest Posts</h2>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="allPosts" :search="search" :loading="!allPosts" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <router-link :to="`/postdetails/${props.item.id}`">
                  <td class="text-xs-left">{{ props.item.title }}</td>
                </router-link>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import { ALL_POSTS_QUERY } from '../graphql/graphql'

@Component({
    apollo: {
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY
        }
    }
})
export default class Home extends Vue {

  search: string = '';
  headers: any;
  items: any = [];

  constructor() {
    super();
    this.headers = [
      { text: 'Title', align: 'left', value: 'title'}
    ];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
    a {
        text-decoration: none;
    }
</style>
