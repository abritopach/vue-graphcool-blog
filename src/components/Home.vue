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
                  <td class="text-xs-left">{{ props.item.title }}</td>
                  <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                  <td class="justify-center layout px-0">
                    <router-link :to="`/postdetails/${props.item.id}`">
                        <v-btn icon class="mx-0">
                            <v-icon color="primary">visibility</v-icon>
                        </v-btn>
                    </router-link>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
        <!--
        <v-layout row wrap>
          <v-flex xs12>
            <v-card v-for="item in allPosts" v-bind:key="item.id" color="blue-grey darken-2" class="white--text">
              <router-link :to="`/postdetails/${item.id}`">                
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">{{ item.title }}</div>
                      <div>{{ item.user.username }}</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media src="http://jjblog.wp-themes.pro/wp-content/uploads/2015/09/zgsdfg-1200x700.jpg" height="200px" contain></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
              </router-link>
            </v-card>
          </v-flex>
        </v-layout>
        -->
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
      { text: 'Title', align: 'left', value: 'title'},
      { text: 'DateTime', align: 'left', value: 'datetime'},
      { text: 'Actions', align: 'left', value: 'actions' }
    ];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
    a {
        text-decoration: none;
        /*color: white;*/
    }
</style>
