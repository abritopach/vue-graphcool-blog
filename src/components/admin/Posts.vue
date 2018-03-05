<template>
    <section v-if="allPosts">
        <h2>Posts</h2>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="allPosts" :search="search" :loading="!allPosts" hide-actions class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td v-if="props.item.user" class="text-xs-left">{{ props.item.user.username }}</td>
                <td class="text-xs-left">{{ props.item.createdAt | formatDate }}</td>
                <td class="justify-center layout px-0">
                    <router-link :to="`/postdetails/${props.item.id}`">
                        <v-btn icon class="mx-0">
                            <v-icon color="primary">visibility</v-icon>
                        </v-btn>
                    </router-link>
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { ALL_POSTS_QUERY, DELETE_POST_MUTATION } from '../../graphql/graphql'


@Component({
    apollo: {
        // Fetch all posts.
        allPosts: {
            query: ALL_POSTS_QUERY
        }
    }
})
export default class Users extends Vue {

    headers: any;
    items: any = [];
    search: string = '';

    constructor() {
        super();
        this.headers = [
          { text: 'Title', align: 'left', value: 'title'},
          { text: 'Username', align: 'left', value: 'username' },
          { text: 'DateTime', align: 'left', value: 'datetime' },
          { text: 'Actions', align: 'left', value: 'actions' }
        ];
    }

    deleteItem(item: any) {
        console.log('deleteItem', item);
        this.$apollo
            .mutate({
                mutation: DELETE_POST_MUTATION,
                variables: {
                    id: item.id,
                },
                update: (store, { data: { deletePost } }) => {
                    // Read data from cache for the allPosts query.
                    let data = store.readQuery({ query: ALL_POSTS_QUERY }) || {};

                    // Delete post from the data.
                    (data as any)['allPosts'] = (data as any)['allPosts'].filter((i: any) => i.id !== deletePost.id);

                    // Write data back to the cache for the allPosts query.
                    store.writeQuery({ query: ALL_POSTS_QUERY, data })
                }
            })
            .then(response => {
                console.log(response);
            })
    }
    
};
</script>
   
<style scoped>
    a {
        text-decoration: none;
    }
</style>