<template>
   <section v-if="allPosts">
        <h2>Latest Posts</h2>
        <!--
        <v-flex xs12 sm6 offset-sm3>
            <app-data-table :data="allPosts" :headers="headers" :actions="showActions" @clicked="onClick"></app-data-table>
        </v-flex>
        -->
        <!--
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="allPosts" :search="search" :loading="!allPosts" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.title }}</td>
                  <td class="text-xs-left">{{ props.item.user.username }}</td>
                  <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                  <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="viewItem(props.item)">
                        <v-icon color="primary">visibility</v-icon>
                    </v-btn>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
        -->
    <v-card>
      <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg4 v-for="item in allPosts" v-bind:key="item.id" >
            <v-card height="100%">   
              <v-container fluid grid-list-md text-xs-center @click="viewItem(item)">
                <v-layout row wrap>
                  <v-flex xs7>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{ item.title }}</h3>
                            <div class="content">{{ item.content }}</div>
                        </div>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <!--
                        <v-avatar size="40px">
                            <img src="http://i.pravatar.cc/120" alt="">
                        </v-avatar>
                        <span>{{ item.user.username }}</span>
                        -->
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img src="http://i.pravatar.cc/120" alt="">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.user.username }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdAt | formatDate }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <!--
                            <v-list-tile-action>
                                <v-icon>chat_bubble</v-icon>
                            </v-list-tile-action>
                            -->
                        </v-list-tile>
                    </v-card-actions>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media src="https://picsum.photos/300/200/?random" height="200px" contain></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
         </v-container>
    </v-card>
    </section>
</template>

<script lang="ts">

import Vue from 'vue' 
import Component from 'vue-class-component'

import AppDataTable from '../components/common/AppDataTable.vue'

// Vuex.
import { Action } from 'vuex-class';

import { ALL_POSTS_QUERY, subscribeToPostsChanges } from '../graphql/graphql'

@Component({
    apollo: {
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY
        }
    },
    components: {
        // Add a reference to the component in the components property.
        AppDataTable
    }
})
export default class Home extends Vue {

    search: string = '';
    headers: any;
    items: any = [];
    subscription: any;
    showActions: any = {search: true, view: true, edit: false, delete: false}

    @Action('SELECTED_POST') actionSelectedPost: any;

    constructor() {
        super();
        this.headers = [
            { text: 'Title', align: 'left', value: 'title'},
            { text: 'Username', align: 'left', value: 'username' },
            { text: 'DateTime', align: 'left', value: 'datetime'},
            { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }

    created() {
        console.log("created Home");
    }

    mounted() {
        console.log("mounted Home");
        this.subscription = subscribeToPostsChanges(this.$apollo);
        console.log(this.subscription);
    }

    beforeDestroy() {
        console.log("beforeDestroy Home");
        this.subscription.unsubscribe();
    }

    viewItem(item: any) {
        console.log('viewItem', item);
        this.actionSelectedPost({ data: item });
        this.$router.push('/postdetails')
    }

    onClick(option: any) {
        const {action, item} = option;
        if (action === "viewItem") {
            this.viewItem(item);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only. -->
<style scoped>
    a {
        text-decoration: none;
        /*color: white;*/
    }
    li {
        list-style: none;
    }
    .content {
        height: 3em;
        overflow: hidden;
        width: 100%;
    }
    content::before {
        content: '...';
        float: right;
    }
</style>
